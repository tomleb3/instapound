import { Link } from "react-router-dom"
import { utilService } from '../../services/utilService'

export const CommentRender = ({ post, comments, collapsedView }) => {

    const { timeSince } = utilService

    if (collapsedView) return <div className="comment-section-collapsed">
        <div>
            <Link to={post.byUser.username}>{post.byUser.username}</Link>
            &nbsp;<span>{post.txt}</span>
        </div>

        <div>{comments.length > 2 &&
            <Link to={`p/${post._id}`} className="muted fw400">View all <span>{comments.length}</span> comments</Link>}
        </div>

        {comments.map((comment, idx) => {
            return idx > 1 ? null
                : <div key={comment._id}>
                    <Link to={`${comment.byUser.username}/`}>{comment.byUser.username}</Link>
                    &nbsp;<span>{comment.txt}</span>
                </div>
        })}
    </div>

    else return <div className="comment-section-container">
        <div className="comment-section">
            <div className="flex">
                <img className="commentor-img" src={post.byUser.imgUrl} alt="User" />
                <div className="flex col">
                    <div>
                        <Link to={post.byUser.username}>{post.byUser.username}</Link>
                    &nbsp;<span>{post.txt}</span>
                    </div>
                    <time>{timeSince(post.createdAt)}</time>
                </div>
            </div>

            {comments.map(comment => {
                return <div key={comment._id}>
                    <img className="commentor-img" src={comment.byUser.imgUrl} alt="User" />
                    <div className="flex col">
                        <div>
                            <Link to={`${comment.byUser.username}/`}>{comment.byUser.username}</Link>
                        &nbsp;<span>{comment.txt}</span>
                        </div>
                        <time>{timeSince(comment.createdAt)}</time>
                    </div>
                </div>
            })}
        </div>
    </div>
}