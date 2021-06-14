import { combineReducers } from 'redux'
import { postReducer } from './postReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    postModule: postReducer,
    userModule: userReducer,
})