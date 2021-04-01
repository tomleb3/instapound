// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const commentService = {
    query,
    add,
    edit,
    remove
}

function query(post) {
    // return storageService.query('comment')
    return httpService.post('comment', post)
}

function add(comment) {
    return httpService.post('comment/add', comment)
}

function edit(comment) {
    return httpService.put('comment', comment)
}

function remove(comment) {
    return httpService.delete('comment', comment)
}