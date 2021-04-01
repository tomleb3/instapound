import { httpService } from './httpService'

export const likeService = {
    query,
    add,
    remove
}

function query(post) {
    return httpService.post('like', post)
}

function add(like) {
    return httpService.post('like/add', like)
}

function remove(like) {
    return httpService.delete('like', like)
}