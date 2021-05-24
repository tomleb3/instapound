import { Link } from "react-router-dom"

export const LikeRender = ({ likes }) => {

    const getLikeSyntax = () => {
        const likeCount = likes.length
        return likeCount > 1 ? <Link to="/TEMP"><span>{likeCount}</span> Likes</Link> :
            <Link to={`/${likes[0].byUser.username}`}><span>{likes[0].byUser.username}</span> liked this</Link>
    }

    return <div className="like-render">
        {likes.length ? <label>{getLikeSyntax()}</label> : null}
    </div>
}