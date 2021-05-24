import { httpService } from './httpService'

export const postService = {
    getFeed,
    getUserPosts,
    getById,
    add,
    edit,
    remove
}

function getFeed(loggedInUserId) {
    return httpService.get(`post/feed/${loggedInUserId}`)
}

function getUserPosts(username) {
    return httpService.get(`post/by/${username}`)
}

function getById(postId) {
    return httpService.get(`post/${postId}`)
}

function add(post) {
    return httpService.post('post', post)
}

function edit(post) {
    return httpService.put('post', post)
}

function remove(post) {
    return httpService.delete('post', post)
}