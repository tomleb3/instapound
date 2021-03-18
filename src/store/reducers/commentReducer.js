const initialState = {
    comments: [],
}

export function commentReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_COMMENTS':
            return { ...state, comments: action.comments }
        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map(comment => (comment._id === action.comment._id) ? action.comment : comment)
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }
        case 'REMOVE_COMMENT':
            return { ...state, comments: state.comments.filter(comment => comment._id !== action.commentId) }
        default:
            return state
    }
}