// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    checkEmail,
    checkUsername
}

window.userService = userService

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`user/${userId}`)
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

async function checkEmail(userCred) {
    return await httpService.post('auth/checkemail', userCred)
}
async function checkUsername(userCred) {
    return await httpService.post('auth/checkusername', userCred)
}

function _saveLocalUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'))
}