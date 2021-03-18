import { connect } from 'react-redux'
import { PostList } from '../cmps/PostList'

const _Home = ({ posts }) => {

    return <main className="home-page main-layout m-page">
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
export const Home = connect(mapStateToProps)(_Home)