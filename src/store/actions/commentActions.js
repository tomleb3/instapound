import { commentService } from "../../services/commentService"

export function loadComments(post) {
    return async dispatch => {
        try {
            const comments = await commentService.query(post)
            dispatch({ type: 'SET_COMMENTS', comments })
            return comments
        } catch (err) {
            console.log('commentActions:', err)
        }
    }
}

export function addComment(comment) {
    return async dispatch => {
        try {
            const addedComment = await commentService.add(comment)
            dispatch({ type: 'ADD_COMMENT', comment: addedComment })
        } catch (err) {
            console.log('commentActions:', err)
        }
    }
}

export function editComment(comment) {
    return async dispatch => {
        try {
            const editedComment = await commentService.update(comment)
            dispatch({ type: 'EDIT_COMMENT', comment: editedComment })
        } catch (err) {
            console.log('commentActions:', err)
        }
    }
}

export function removeComment(commentId) {
    return async dispatch => {
        try {
            await commentService.remove(commentId)
            dispatch({ type: 'REMOVE_COMMENT', commentId })
        } catch (err) {
            console.log('commentActions:', err)
        }
    }
}