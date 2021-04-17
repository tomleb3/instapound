import { PostPreview } from './PostPreview.jsx'

export const PostList = ({ posts }) => {

    if (!posts || !posts.length) return <div></div>
    
    return <section className="post-list">
        {posts.map(post => {
            return <PostPreview key={post._id} post={post} />
        })}
    </section>
}