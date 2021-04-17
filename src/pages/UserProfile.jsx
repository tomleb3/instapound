import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { postService } from '../services/postService'

const _UserProfile = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // (async () => setPosts(await postService.getUserPosts()))()
    }, [])

    return <section className="user-profile">

    </section>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const UserProfile = connect(mapStateToProps)(_UserProfile)