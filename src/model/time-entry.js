import { formatDate } from '../utils/format-utils.js'
import { Timestamp } from '../timestamp.js'

class TimeEntry {
    constructor(date = formatDate(new Date()), entries = []) {
        this.date = date
        this.entries = entries
    }

    get total() {
        if (!this.entries)
            return new Timestamp()

        // Subtract the pair of entries to get the elapsed time
        const elapsedTimeEntries = []
        this.entries.forEach((time, index) => {
            const isExit = (index + 1) % 2 == 0

            if (isExit) {
                const timestamp1 = Timestamp.parse(time)
                const timestamp2 = Timestamp.parse(this.entries[index - 1])

                timestamp1.subtract(timestamp2)
                elapsedTimeEntries.push(timestamp1.toString())
            }
        })

        // Sum the total elapsed time
        const total = new Timestamp()

        elapsedTimeEntries.forEach(time => {
            total.add(Timestamp.parse(time))
        })

        return total
    }
}

export { TimeEntry }