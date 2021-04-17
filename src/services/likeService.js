import { httpService } from './httpService'

export const likeService = {
    query,
    add,
    remove
}

function query(post) {
    return httpService.get(`like?postId=${post._id}`)
}

function add(postId) {
    return httpService.post(`like/${postId}`)
}

function remove(likeId) {
    return httpService.delete(`like/${likeId}`)
}