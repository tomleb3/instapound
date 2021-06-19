import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"
import { PostPreview } from "../cmps/PostPreview"
import { UserPosts } from "../cmps/UserPosts"
import { postService } from '../services/postService'
import { WindowDataContext } from '../App'

export const PostDetails = () => {

    const postId = useParams().id
    const [post, setPost] = useState(useLocation().post)
    const postExists = post && !!Object.keys(post).length
    const { windowData } = useContext(WindowDataContext)
    const { windowWidth } = windowData

    useEffect(() => {
        (async () =>
            setPost(await postService.getById(postId)))()
    }, [postId])

    useEffect(() => {
        if (!postExists) return
        const { fullname } = post.byUser
        document.title = post.txt ? `${fullname} on Instapound: "${post.txt}"`
            : `Instapound photo by ${fullname} \u2022 ${dateTimeSyntax}`
    }, [post])

    const dateTimeSyntax = postExists &&
        `${new Date(post.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
        at ${new Date(post.createdAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}`

    if (!postExists) return <div className="fill"></div>
    return <section className="post-details-container">
        <main className="post-details main-layout">
            <div className="post-panel">
                <PostPreview post={post} feedView={windowWidth < 735} />
            </div>
            <div className="other-posts-panel">
                <span>More posts from <Link to={`/${post.byUser.username}/`}>{post.byUser.username}</Link></span>
                <UserPosts username={post.byUser.username} withoutPostId={postId} />
            </div>
        </main>
    </section>
}