// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const postService = {
    query,
    add,
    edit,
    remove
}

function query() {
    // return storageService.query('post')
    return httpService.get('post')
}

function add(post) {
    return httpService.post('like', post)
}

function edit(post) {
    return httpService.put('like', post)
}

function remove(post) {
    return httpService.delete('like', post)
}