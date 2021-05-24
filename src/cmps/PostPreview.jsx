import { likeService } from '../services/likeService'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AddComment } from './PostCmps/AddComment'
import { commentService } from '../services/commentService'
import { UserContainer } from './PostCmps/UserContainer'
import { ActionBtns } from './PostCmps/ActionBtns'
import { LikeRender } from './PostCmps/LikeRender'
import { CommentRender } from './PostCmps/CommentRender'
import { TimeContainer } from './PostCmps/TimeContainer'

const _PostPreview = ({ post, loggedInUser, feedView }) => {

    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const myLike = likes.find(like => like.byUser._id === loggedInUser._id)

    useEffect(() => {
        (async () => {
            setLikes(await likeService.query(post))
            setComments(await commentService.query(post))
        })()
    }, [post])

    const onToggleLike = () => myLike ? onRemoveLike() : onAddLike()

    const onAddLike = async () => {
        try {
            if (myLike) return
            await likeService.add(post._id)
            setLikes(await likeService.query(post))
        } catch (err) {
            // SNACKBAR DOCKED TO BOTTOM
        }
    }
    const onRemoveLike = async () => {
        try {
            if (!myLike) return
            await likeService.remove(myLike._id)
            setLikes(await likeService.query(post))
        } catch (err) {
            // SNACKBAR DOCKED TO BOTTOM
        }
    }

    const onCommentAdded = async () => {
        try {
            setComments(await commentService.query(post))
        } catch (err) {
            // SNACKBAR DOCKED TO BOTTOM
        }
    }

    if (feedView) return <article className="post-preview feed-view">
        <UserContainer post={post} />
        <img className="post-img" src={post.imgUrl} alt="" onDoubleClick={onAddLike} />
        <ActionBtns myLike={myLike} onToggleLike={onToggleLike} />
        <LikeRender likes={likes} />
        <CommentRender post={post} comments={comments} collapsedView />
        <TimeContainer dateTime={post.createdAt} />
        <AddComment aboutPostId={post._id} onCommentAdded={onCommentAdded} />
    </article>

    else return <article className="post-preview flex">
        <img className="post-img" src={post.imgUrl} alt="" onDoubleClick={onAddLike} />
        <div className="right-panel flex col">
            <UserContainer post={post} />
            <CommentRender post={post} comments={comments} />
            <ActionBtns myLike={myLike} onToggleLike={onToggleLike} />
            <LikeRender likes={likes} />
            <TimeContainer dateTime={post.createdAt} />
            <AddComment aboutPostId={post._id} onCommentAdded={onCommentAdded} />
        </div>
    </article>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const PostPreview = connect(mapStateToProps)(_PostPreview)