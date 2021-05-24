import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppFooter } from '../cmps/AppFooter'
import { CloudinaryUploader } from '../cmps/CloudinaryUploader'
import { FeedList } from '../cmps/FeedList'
import { postService } from '../services/postService'

const _Home = ({ loggedInUser }) => {

    const [posts, setPosts] = useState([])
    document.title = 'Instapound'

    useEffect(() => {
        (async () => setPosts(await postService.getFeed(loggedInUser._id)))()
    }, [])

    return <main className="home-page main-layout">
        <article className="left-panel">
            <FeedList posts={posts} feedView />
        </article>
        <article className="right-panel">
            <div className="profile-container flex a-center">
                <Link to={loggedInUser.username}>
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
            <CloudinaryUploader isPostMode />
            <AppFooter homePage />
        </article>
    </main>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const Home = connect(mapStateToProps)(_Home)