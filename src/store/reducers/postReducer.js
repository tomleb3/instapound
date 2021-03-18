const initialState = {
    posts: [],
    // filterBy: { type: 'All', name: '' , inStock: true }
}

export function postReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.posts }
        case 'EDIT_POST':
            return {
                ...state,
                posts: state.posts.map(post => (post._id === action.post._id) ? action.post : post)
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        case 'REMOVE_POST':
            return { ...state, posts: state.posts.filter(post => post._id !== action.postId) }
        default:
            return state
    }
} 




// case 'FILTER_POSTS':
        //     return { ...state, filterBy: action.filterBy }