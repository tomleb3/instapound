import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import { PostPreview } from "../cmps/PostPreview"
import { postService } from '../services/postService'

export const PostDetails = () => {

    const postId = useParams().id
    const [post, setPost] = useState(useLocation().post)
    const postExists = post && Object.keys(post).length

    useEffect(() => {
        if (!postExists)
            (async () => setPost(await postService.getById(postId)))()
    }, [])

    useEffect(() => {
        if (!postExists) return
        const { fullname } = post.byUser
        document.title = post.txt ? `${fullname} on Instapound: "${post.txt}"`
            : `Instapound photo by ${fullname} \u2022 ${dateTimeSyntax}`
    })

    const dateTimeSyntax = postExists &&
        `${new Date(post.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
        at ${new Date(post.createdAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}`

    if (!postExists) return <div></div>
    return <main className="post-details main-layout">
        <div className="post-panel">
            <PostPreview post={post} />
        </div>
        <div className="other-posts-panel">

        </div>
    </main>
}