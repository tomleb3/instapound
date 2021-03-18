import { subscriptionService } from "../../services/subscriptionService"

export function loadSubscriptions(filterBy) {
    return async dispatch => {
        try {
            const subscriptions = await subscriptionService.query(filterBy)
            if (!filterBy) dispatch({ type: 'SET_SUBSCRIPTIONS', subscriptions })
            return subscriptions
        } catch (err) {
            console.log('subscriptionActions:', err)
        }
    }
}

export function addSubscription(subscription) {
    return async dispatch => {
        try {
            const addedSubscription = await subscriptionService.add(subscription)
            dispatch({ type: 'ADD_SUBSCRIPTION', subscription: addedSubscription })
        } catch (err) {
            console.log('subscriptionActions:', err)
        }
    }
}

export function removeSubscription(subscriptionId) {
    return async dispatch => {
        try {
            await subscriptionService.remove(subscriptionId)
            dispatch({ type: 'REMOVE_SUBSCRIPTION', subscriptionId })
        } catch (err) {
            console.log('subscriptionActions:', err)
        }
    }
}