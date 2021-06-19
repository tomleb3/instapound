import { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AppFooter } from '../cmps/AppFooter'
import { ImgUploader } from '../cmps/ImgUploader'
import { FeedList } from '../cmps/FeedList'
import { postService } from '../services/postService'
import { WindowDataContext } from '../App'
import { isMobileOnly } from 'react-device-detect'

const _Home = ({ loggedInUser }) => {

    const [posts, setPosts] = useState([])
    const [isLoadingFeed, setIsLoadingFeed] = useState(false)
    let currPage = useLocation().pathname
    const { windowData } = useContext(WindowDataContext)
    const { windowWidth } = windowData

    useEffect(() => {
        (async () => {
            setIsLoadingFeed(true)
            setPosts(await postService.getFeed(loggedInUser.username))
            setIsLoadingFeed(false)
        })()
        document.title = 'Instapound'
    }, [])

    const mobileHeader = (
        <header className="mobile-header">
            <div>
                <button>
                    <label htmlFor="uploader-input">
                        <svg aria-label="New Story" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path clipRule="evenodd" d="M38.5 46h-29c-5 0-9-4-9-9V17c0-5 4-9 9-9h1.1c1.1 0 2.2-.6 2.7-1.7l.5-1c1-2
                     3.1-3.3 5.4-3.3h9.6c2.3 0 4.4 1.3 5.4 3.3l.5 1c.5 1 1.5 1.7 2.7 1.7h1.1c5 0 9 4 9 9v20c0 5-4 9-9
                      9zm6-29c0-3.3-2.7-6-6-6h-1.1C35.1 11 33 9.7 32 7.7l-.5-1C31 5.6 29.9 5 28.8 5h-9.6c-1.1 0-2.2.6-2.7
                       1.7l-.5 1c-1 2-3.1 3.3-5.4 3.3H9.5c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6h29c3.3 0 6-2.7 6-6V17zM24
                        38c-6.4 0-11.5-5.1-11.5-11.5S17.6 15 24 15s11.5 5.1 11.5 11.5S30.4 38 24 38zm0-20c-4.7 0-8.5 3.8-8.5
                         8.5S19.3 35 24 35s8.5-3.8 8.5-8.5S28.7 18 24 18z" fillRule="evenodd"></path>
                        </svg>
                    </label>
                </button>
                <div className="logo">
                    <NavLink to="/" exact={true} replace>Instapound</NavLink>
                </div>
                <NavLink to="/direct/">
                    <svg aria-label="Messenger" fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                        {currPage === '/direct/' ? <path clipRule="evenodd" d="M10.2 29.8c-.7 1 .6 2.2 1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6
                             1.2 3.9.8 5-.9L38 18.2c.7-1-.6-2.2-1.6-1.5L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5
                              .9l-6.7 10.7zM24 1c13 0 23 9.5 23 22.3S37 45.6 24 45.6c-2.3 0-4.6-.3-6.7-.9-.4-.1-.8-.1-1.2.1l-4.6
                               2c-1.1.6-2.5-.3-2.5-1.6l-.1-4.1c0-.5-.2-1-.6-1.3C3.7 35.8 1 30 1 23.3 1 10.5 11 1 24 1z" fillRule="evenodd"></path>
                            : <path d="M36.2 16.7L29 22.2c-.5.4-1.2.4-1.7 0l-5.4-4c-1.6-1.2-3.9-.8-5 .9l-6.8 10.7c-.7 1 .6 2.2
                                1.6 1.5l7.3-5.5c.5-.4 1.2-.4 1.7 0l5.4 4c1.6 1.2 3.9.8 5-.9l6.8-10.7c.6-1.1-.7-2.2-1.7-1.5zM24
                                 1C11 1 1 10.5 1 23.3 1 30 3.7 35.8 8.2 39.8c.4.3.6.8.6 1.3l.2 4.1c0 1 .9 1.8 1.8 1.8.2 0 .5 0
                                  .7-.2l4.6-2c.2-.1.5-.2.7-.2.2 0 .3 0 .5.1 2.1.6 4.3.9 6.7.9 13 0 23-9.5 23-22.3S37 1 24 1zm0
                                   41.6c-2 0-4-.3-5.9-.8-.4-.1-.8-.2-1.3-.2-.7 0-1.3.1-2 .4l-3 1.3V41c0-1.3-.6-2.5-1.6-3.4C6.2
                                    34 4 28.9 4 23.3 4 12.3 12.6 4 24 4s20 8.3 20 19.3-8.6 19.3-20 19.3z"></path>}
                    </svg>
                </NavLink>
            </div>
        </header>
    )

    return <main className="home-page main-layout fill flex j-between grow">

        {isMobileOnly && mobileHeader}

        <article className="left-panel">
            <FeedList posts={posts} isLoadingFeed={isLoadingFeed} feedView />
        </article>
        {windowWidth >= 1000 && <article className="right-panel">
            <div className="profile-container flex a-center">
                <Link to={`${loggedInUser.username}/`}>
                    <img src={loggedInUser.imgUrl} alt={`${loggedInUser.username}'s profile picture`} />
                </Link>
                <div className="flex col grow">
                    <Link to={loggedInUser.username}>
                        <label className="fs14 fw600 pointer">{loggedInUser.username}</label>
                    </Link>
                    <span>{loggedInUser.fullname}</span>
                </div>
                <button>
                    <span>Switch</span>
                </button>
            </div>
            <button className="btn-upload">
                <label htmlFor="uploader-input">UPLOAD</label>
            </button>
            <ImgUploader isPostMode />
            <AppFooter homePage />
        </article>}
    </main>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const Home = connect(mapStateToProps)(_Home)