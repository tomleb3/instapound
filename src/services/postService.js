import { httpService } from './httpService'

export const postService = {
    query,
    add,
    edit,
    remove
}

function query() {
    return httpService.get('post')
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