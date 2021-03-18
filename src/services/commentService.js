// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const commentService = {
    query,
    add,
    edit,
    remove
}

function query() {
    // return storageService.query('comment')
    return httpService.get('comment')
}

function add(post) {
    return httpService.post('comment', post)
}

function edit(post) {
    return httpService.post('comment', post)
}

function remove(post) {
    return httpService.delete('comment', post)
}