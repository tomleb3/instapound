import { httpService } from './httpService'

const USER_STORAGE_KEY = 'loggedInUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getByUsername,
    remove,
    save,
    checkCreds
}

function getUsers(filterTxt = '') {
    const queryStr = filterTxt ? `?name=${filterTxt}` : ''
    return httpService.get(`user${queryStr}`)
}

function getByUsername(username) {
    return httpService.get(`user/${username}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function save(user) {
    try {
        const loggedInUser = _getLocalUser()
        user = await httpService.put(`user/${user._id}`)
        if (loggedInUser._id === user._id) _saveLocalUser(user)
        return user
    } catch (err) {
        throw err
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        localStorage.clear()
        return await httpService.post('auth/logout')
    } catch (err) {
        throw err
    }
}

async function checkCreds(userCred) {
    try {
        return await httpService.post('auth/checkcred', userCred)
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    return user
}

function _getLocalUser() {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY))
}