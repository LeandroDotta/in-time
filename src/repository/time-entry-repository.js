import { TimeEntry } from '../model/time-entry.js';
import { formatDate } from '../utils/format-utils.js';

/**
 * Gets all the time entries in the storage.
 * @returns {TimeEntry[]} All the entries or an empty array if there's no entry in the storage.
 */
function getAll() {
    const result = []

    const keys = Object.keys(localStorage)

    // Sort the dates from lesser to higher
    keys.sort(function(a, b){
        const date1 = new Date(a)
        const date2 = new Date(b)

        return date1 - date2;
    })

    if (keys.length === 0)
        return result

    keys.forEach((key, index) => {
        const entries = JSON.parse(localStorage.getItem(key))
        result.push(new TimeEntry(key, entries))
    })

    return result
}

/**
 * Gets a time entry of a specific date.
 * @param {Date|String} date
 * @returns {TimeEntry} The time entry of the given date or `null` if no entry if found.
 */
function getByDate(date) {
    let result = null

    if (date) {
        let key = date

        if (date instanceof Date)
            key = formatDate(date)

        let entries = localStorage.getItem(key)

        if (entries) {
            entries = JSON.parse(entries)
            result = new TimeEntry(key, entries)
        }
    }

    return result;
}

/**
 * Adds or updates a time entry on the storage.
 * @param {TimeEntry} entry
 */
function update(entry) {
    if (!(entry instanceof TimeEntry))
        throw Error('Invalid Argument. The time entry update must be of type TimeEntry')

    localStorage.setItem(entry.date, JSON.stringify(entry.entries))
}

/**
 * Removes a time entry from storage.
 * @param {TimeEntry} entry
 */
function remove(entry) {
    if (!(entry instanceof TimeEntry))
        throw Error('Invalid Argument. The time entry update must be of type TimeEntry')

    localStorage.removeItem(entry.key)
}

export { getAll, getByDate, update, remove }