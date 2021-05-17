// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getByUsername,
    remove,
    update,
    getLoggedinUser,
    checkCreds
}

window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}

function getByUsername(username){
    return httpService.get(`user/${username}`)
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _handleLogin(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    localStorage.clear()
    return await httpService.post('auth/logout')
}

async function checkCreds(userCred) {
    try {
        return await httpService.post('auth/checkcred', userCred)
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'))
}