import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { PostList } from '../cmps/PostList'
import { loadPosts } from '../store/actions/postActions.js'

const _Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => setPosts(await loadPosts()))()
    }, [])

    return <main className="home-page main-layout">
        <PostList posts={posts} />
    </main>
}

const mapStateToProps = state => {
    return {
        posts: state.postModule.posts,
        // likes: state.postModule.posts,
        // comments: state.postModule.posts,
    }
}
const mapDispatchToProps = {
    loadPosts,
}
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)