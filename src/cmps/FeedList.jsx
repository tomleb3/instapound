import { Link } from 'react-router-dom'
import { PostPreview } from "./PostPreview"
import Skeleton from 'react-loading-skeleton'

export const FeedList = ({ posts, isLoadingFeed, feedView }) => {

    const CLOUDINARY_BASE_URL = process.env.REACT_APP_CLOUDINARY_BASE_URL

    return <div className="feed-list">
        {isLoadingFeed ? <div className="loader-container m-page">
            <Skeleton height={766} width={616} />
            <Skeleton height={766} width={616} />
        </div>
            : posts?.length ? posts.map(post => {
                return <PostPreview post={post} feedView={feedView} key={post._id} />
            })
                : <div className="blank-feed">
                    <img src={`${CLOUDINARY_BASE_URL}/blank-feed_varqbm.svg`} alt="Blank Feed" />
                    <span>Your feed is empty,</span>
                    <span>Follow <Link to="/explore/">other users</Link> to fill it up.</span>
                </div>}
    </div>
}