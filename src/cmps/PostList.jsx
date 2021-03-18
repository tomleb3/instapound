import { PostPreview } from './PostPreview.jsx'

export const PostList = ({ posts }) => {

    return <section className="post-list">
        {posts.map(post => {
            return <PostPreview key={post._id} post={post} />
        })}
    </section>
}