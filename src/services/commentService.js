import { httpService } from './httpService'

export const commentService = {
    query,
    add,
    edit,
    remove
}

function query(post) {
    return httpService.get(`comment?postId=${post._id}`)
}

function add(comment) {
    return httpService.post('comment', comment)
}

function edit(comment) {
    return httpService.put('comment', comment)
}

function remove(comment) {
    return httpService.delete('comment', comment)
}