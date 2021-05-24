import { PostPreview } from "./PostPreview"

export const FeedList = ({ posts, feedView }) => {

    if (!posts || !posts.length) return <div></div>

    return <div className="feed-list">
        {posts.map(post => {
            return <PostPreview post={post}
                feedView={feedView} key={post._id} />
        })}
    </div>
}