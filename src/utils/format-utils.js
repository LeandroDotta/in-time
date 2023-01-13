function formatTime(date) {
    const hour = date.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
    const minute = date.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })

    return `${hour}:${minute}`
}

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export { formatTime, formatDate }