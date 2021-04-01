import { likeService } from "../../services/likeService"

export function loadLikes(post) {
    return async dispatch => {
        try {
            const likes = await likeService.query(post)
            dispatch({ type: 'SET_LIKES', likes })
            return likes
        } catch (err) {
            console.log('likeActions:', err)
        }
    }
}

export function addLike(like) {
    return async dispatch => {
        try {
            const addedLike = await likeService.add(like)
            dispatch({ type: 'ADD_LIKE', like: addedLike })
        } catch (err) {
            console.log('likeActions:', err)
        }
    }
}

export function removeLike(likeId) {
    return async dispatch => {
        try {
            await likeService.remove(likeId)
            dispatch({ type: 'REMOVE_LIKE', likeId })
        } catch (err) {
            console.log('likeActions:', err)
        }
    }
}