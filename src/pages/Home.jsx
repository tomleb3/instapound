import { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppFooter } from '../cmps/AppFooter'
import { ImgUploader } from '../cmps/ImgUploader'
import { FeedList } from '../cmps/FeedList'
import { postService } from '../services/postService'
import { WindowDataContext } from '../App'

const _Home = ({ loggedInUser }) => {

    const [posts, setPosts] = useState([])
    const { windowData } = useContext(WindowDataContext)
    const { windowWidth } = windowData

    useEffect(() => {
        (async () => setPosts(await postService.getFeed(loggedInUser._id)))()
        document.title = 'Instapound'
    }, [])

    return <main className="home-page main-layout full-height flex col grow">
        <article className="left-panel">
            <FeedList posts={posts} feedView />
        </article>
        {windowWidth >= 1000 && <article className="right-panel" style={{ left: windowWidth / 1.5 }}>
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
    </main >
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const Home = connect(mapStateToProps)(_Home)