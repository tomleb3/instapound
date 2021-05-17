import { FeedPreview } from './FeedPreview.jsx'

export const FeedList = ({ posts }) => {

    if (!posts || !posts.length) return <div></div>

    return <section className="feed-list">
        {posts.map(post => {
            return <FeedPreview key={post._id} post={post} />
        })}
    </section>
}