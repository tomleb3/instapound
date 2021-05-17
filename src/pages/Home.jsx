import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppFooter } from '../cmps/AppFooter'
import { FeedList } from '../cmps/FeedList'
import { postService } from '../services/postService'

const _Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => setPosts(await postService.getFeed()))()
    }, [])

    return <main className="home-page main-layout">
        <FeedList posts={posts} />
        <article className="suggestions-container">
            <AppFooter homePage />
        </article>
    </main>
}

const mapStateToProps = state => {
    return {
        posts: state.postModule.posts,
        // likes: state.postModule.posts,
        // comments: state.postModule.posts,
    }
}
export const Home = connect(mapStateToProps)(_Home)