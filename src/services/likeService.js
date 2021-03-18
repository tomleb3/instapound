// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const likeService = {
    query,
    add,
    remove
}

function query() {
    // return storageService.query('like')
    return httpService.get('like')
}

function add(post) {
    return httpService.post('like', post)
}

function remove(post) {
    return httpService.delete('like', post)
}