class Timestamp {
    constructor(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.milliseconds = milliseconds
    }

    add(timestamp) {
        const newTimestamp = Timestamp.add(this, timestamp)
        this.hours = newTimestamp.hours
        this.minutes = newTimestamp.minutes
        this.seconds = newTimestamp.seconds
        this.milliseconds = newTimestamp.milliseconds
    }

    static add(timestamp1, timestamp2) {
        return Timestamp.fromMilliseconds(timestamp1.toMilliseconds() + timestamp2.toMilliseconds())
    }

    subtract(timestamp) {
        const newTimestamp = Timestamp.subtract(this, timestamp)
        this.hours = newTimestamp.hours
        this.minutes = newTimestamp.minutes
        this.seconds = newTimestamp.seconds
        this.milliseconds = newTimestamp.milliseconds
    }

    static subtract(timestamp1, timestamp2) {
        return Timestamp.fromMilliseconds(timestamp1.toMilliseconds() - timestamp2.toMilliseconds())
    }

    isHigher(timestamp) {
        return this.toMilliseconds() > timestamp.toMilliseconds()
    }

    toMilliseconds() {
        return this.milliseconds + (this.seconds*1000) + (this.minutes*60*1000) + (this.hours*60*60*1000)
    }

    toString() {
        return `${this.hours.toLocaleString(navigator.language, { minimumIntegerDigits: 2 })}:${this.minutes.toLocaleString(navigator.language, { minimumIntegerDigits: 2 })}`
    }

    static fromMilliseconds(milliseconds) {
        const timestamp = new Timestamp()

        timestamp.hours = Math.floor(milliseconds/1000/60/60)
        timestamp.minutes = Math.floor((milliseconds-timestamp.toMilliseconds())/1000/60)
        timestamp.seconds = Math.floor((milliseconds-timestamp.toMilliseconds())/1000)
        timestamp.milliseconds = milliseconds-timestamp.toMilliseconds()

        return timestamp
    }

    static parse(timestampString) {
        const tokens = timestampString.split(':')
        const timestamp = new Timestamp()

        if (tokens.length > 0)
            timestamp.hours = parseInt(tokens[0])

        if (tokens.length > 1)
            timestamp.minutes = parseInt(tokens[1])

        if (tokens.length > 2) {
            const secondsTokens = tokens[2].split('.')

            if (secondsTokens.length > 0)
                timestamp.seconds = parseInt(secondsTokens[0])

            if (secondsTokens.length > 1)
                timestamp.milliseconds = parseInt(secondsTokens[1])
        }

        return timestamp
    }

    static now() {
        return Timestamp.fromMilliseconds(new Date().getMilliseconds())
    }
}

export { Timestamp }