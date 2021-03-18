// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const subscriptionService = {
    query,
    add,
    remove
}

function query() {
    // return storageService.query('like')
    return httpService.get('subscription')
}

function add(user) {
    return httpService.post('subscription', user)
}

function remove(user) {
    return httpService.delete('subscription', user)
}