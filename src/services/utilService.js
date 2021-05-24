export const utilService = {
    delay,
    getRandomInt,
    makeId,
    timeSince,
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt;
}

function timeSince(date, locale = "en-US") {

    date = new Date(date)
    const year = date.getFullYear()
    const currYear = new Date().getFullYear()
    const month = date.getMonth()

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    if (year !== currYear) return new Date(date).toLocaleDateString(locale, options)
    const seconds = Math.floor((new Date() - date) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return new Date(date).toLocaleDateString(locale, options);

    interval = seconds / 86400
    const days = Math.floor(interval)
    if (interval > 1) return days + `${days === 1 ? ' day' : ' days'} ago`

    interval = seconds / 3600
    const hours = Math.floor(interval)
    if (interval > 1) return hours + `${hours === 1 ? ' hour' : ' hours'} ago`

    interval = seconds / 60
    const minutes = Math.floor(interval)
    if (interval > 1) return minutes + `${minutes === 1 ? ' minute' : ' minutes'} ago`

    const secs = Math.floor(seconds)
    return secs + `${secs === 1 ? ' second' : ' seconds'} ago`
}