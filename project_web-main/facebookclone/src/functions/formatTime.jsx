const toTimeFacebook = (time) => {
    const temp = new Date(time)
    const now = new Date()
    const c = Math.floor((now.getTimezoneOffset() - temp + Number(now)) / 1000)
    if (c < 60 * 60 * 24 * 7) {
        return temp.toUTCString().slice(0, 3) + temp.toUTCString().slice(16, 22)
    }
    return temp.toUTCString().slice(0, 22)
}
const getTimeToNow = (time) => {
    const a = new Date(time)
    const now = new Date()
    const c = Math.floor((now.getTimezoneOffset() - a + Number(now)) / 1000)
    if (c > 60 * 60 * 24)
        return a.toUTCString().slice(0, 3) + a.toUTCString().slice(16, 22)
    if (c > 60 * 60) return `${Math.floor(c / (60 * 60))}h`
    if (c > 60) return `${Math.floor(c / 60)}m`
    return '1m'
}

export { toTimeFacebook, getTimeToNow }
