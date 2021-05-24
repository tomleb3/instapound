import { Link } from "react-router-dom"

export const UserContainer = ({ post }) => {

    return <div className="user-container flex">
        <img src={post.byUser.imgUrl} alt="" />
        <div className="flex j-between a-center">
            <div className="flex col j-center">
                <Link className="fs14 fw600" to={`/${post.byUser.username}/`}>{post.byUser.username}</Link>
                {post.geoTag && <Link className="fs12" to={`/explore/${post.geoTag}/`}>{post.geoTag}</Link>}
            </div>
            <button>
                <svg aria-label="More options" fill="#262626" height="16" viewBox="0 0 48 48" width="16">
                    <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                    <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                    <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                </svg>
            </button>
        </div>
    </div>
}