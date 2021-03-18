import { combineReducers } from 'redux'
import { postReducer } from './postReducer'
import { userReducer } from './userReducer'
import { likeReducer } from './likeReducer'
import { commentReducer } from './commentReducer'
import { subscriptionReducer } from './subscriptionReducer'

export const rootReducer = combineReducers({
    postModule: postReducer,
    userModule: userReducer,
    likeModule: likeReducer,
    commentModule: commentReducer,
    subscriptionModule: subscriptionReducer,
})