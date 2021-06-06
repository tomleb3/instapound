import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postService } from '../services/postService'
import { utilService } from '../services/utilService'

export const UserPosts = ({ username, withoutPostId }) => {

    const [posts, setPosts] = useState([])
    const { makeId } = utilService

    useEffect(() => {
        (async () =>
            setPosts(await postService.getUserPosts(username)))()
    }, [username])

    const postRows = () => {
        let _posts = JSON.parse(JSON.stringify(posts))
        if (withoutPostId) _posts = _posts.filter(post => post._id !== withoutPostId)
        while (_posts.length % 3 !== 0) _posts.push({})
        return _posts.reduce((rows, post, idx) => {
            return (idx % 3 === 0 ? rows.push([post])
                : rows[rows.length - 1].push(post)) && rows
        }, [])
    }

    return <section className="user-posts flex wrap">
        {postRows().map(postRow => {
            return <div key={makeId()}>{postRow.map(post => {
                return <article key={makeId()}>
                    {post._id && <Link to={{ pathname: `/p/${post._id}/`, post }}>
                        <Fragment>
                            <img className="post-img" src={post.imgUrl} alt="" />
                            <div className="d-none">
                                <div>
                                    <span></span>
                                    <label>{post.likes.length}</label>
                                </div>
                                <div>
                                    <span></span>
                                    <label>{post.comments.length}</label>
                                </div>
                            </div>
                        </Fragment>
                    </Link>}
                </article>
            })}
            </div>
        })}
    </section>
}