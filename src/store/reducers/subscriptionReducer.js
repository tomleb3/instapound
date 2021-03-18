const initialState = {
    subscriptions: [],
}

export function subscriptionReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SUBSCRIPTIONS':
            return { ...state, subscriptions: action.subscriptions }
        case 'ADD_SUBSCRIPTION':
            return {
                ...state,
                subscriptions: [...state.subscriptions, action.subscription]
            }
        case 'REMOVE_SUBSCRIPTION':
            return { ...state, subscriptions: state.subscriptions.filter(subscription => subscription._id !== action.subscriptionId) }
        default:
            return state
    }
}