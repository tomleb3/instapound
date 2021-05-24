import { useRef } from "react"
import { connect } from "react-redux"
import { useHistory, useLocation } from "react-router"
import { Link } from "react-router-dom"
import { postService } from '../services/postService'

const _CreatePost = ({ loggedInUser }) => {

    const txtAreaRef = useRef(null)
    const history = useHistory(null)
    const location = useLocation(null)
    const postImg = location.imgUrl.url
    let geoTag = null
    let taggedUsers = []

    const onTxtAreaScroll = () => {
        txtAreaRef.current.className = 'scroll-visible'
        setTimeout(() => txtAreaRef.current.className = '', 1000)
    }

    const onPost = async () => {
        await postService.add({
            imgUrl: postImg,
            txt: txtAreaRef.current.value,
            geoTag,
            taggedUsers
        })
        history.push('/')
    }

    if (!location.imgUrl) return <Link to="/" />
    return <section className="create-post main-layout m-page">
        <div className="content-container flex a-center">
            <img className="user-img" src={loggedInUser.imgUrl} alt="User" />
            <textarea placeholder="Write a caption..." onScroll={onTxtAreaScroll}
                ref={txtAreaRef} autoCorrect="off" autoComplete="off" />
            <img className="post-img" src={postImg} alt="Post" />
            <button onClick={onPost}>Share</button>
        </div>
    </section>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const CreatePost = connect(mapStateToProps)(_CreatePost)