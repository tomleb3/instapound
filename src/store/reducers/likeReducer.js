const initialState = {
    likes: [],
}

export function likeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LIKES':
            return { ...state, likes: action.likes }
        case 'ADD_LIKE':
            return {
                ...state,
                likes: [...state.likes, action.like]
            }
        case 'REMOVE_LIKE':
            return { ...state, likes: state.likes.filter(like => like._id !== action.likeId) }
        default:
            return state
    }
}