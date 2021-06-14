import { httpService } from './httpService'

export const subscriptionService = {
    getFollowers,
    getFollowing,
    add,
    remove
}

function getFollowers(username) {
    return httpService.get(`subscription/followers/${username}`)
}
function getFollowing(username) {
    return httpService.get(`subscription/following/${username}`)
}

function add(subscription) {
    return httpService.post('subscription', subscription)
}

function remove(subscription) {
    return httpService.delete('subscription', subscription)
}