import { postService } from "../../services/postService"

export function loadPosts(filterBy) {
    return async dispatch => {
        try {
            const posts = await postService.query(filterBy)
            if (!filterBy) dispatch({ type: 'SET_POSTS', posts })
            return posts
        } catch (err) {
            console.log('postActions:', err)
        }
    }
}

export function addPost(post) {
    return async dispatch => {
        try {
            const addedPost = await postService.add(post)
            dispatch({ type: 'ADD_POST', post: addedPost })
        } catch (err) {
            console.log('postActions:', err)
        }
    }
}

export function editPost(post) {
    return async dispatch => {
        try {
            const editedPost = await postService.update(post)
            dispatch({ type: 'EDIT_POST', post: editedPost })
        } catch (err) {
            console.log('postActions:', err)
        }
    }
}

export function removePost(postId) {
    return async dispatch => {
        try {
            await postService.remove(postId)
            dispatch({ type: 'REMOVE_POST', postId })
        } catch (err) {
            console.log('postActions:', err)
        }
    }
}