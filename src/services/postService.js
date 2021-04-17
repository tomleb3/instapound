import { httpService } from './httpService'

export const postService = {
    getFeed,
    getUserPosts,
    add,
    edit,
    remove
}

function getFeed() {
    return httpService.get('post')
}

function getUserPosts(username) {
    return httpService.get(`post/${username}`)
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