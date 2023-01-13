import { formatDate, formatTime } from '../utils/format-utils.js'
import { Timestamp } from '../timestamp.js'
import { TimeFieldView } from '../view/time-field-view.js'
import { TimeEntryView } from '../view/time-entry-view.js'
import { TimeEntry } from '../model/time-entry.js'
import * as repository from '../repository/time-entry-repository.js'

const REGULAR_TIME = new Timestamp(8)

//const inputTime = document.getElementById('time');
const timeField = new TimeFieldView()
const buttonRegister = document.getElementById('register');
const anchorHistory = document.getElementById('history');
const tableEntries = document.getElementById('time-entries');
const spanDone = document.getElementById('time-done');
const spanLeft = document.getElementById('time-left');
const spanExtra = document.getElementById('time-extra');

let timeEntries = null

function loadEntries() {
    const now = new Date()
    
    timeEntries = repository.getByDate(now)

    if (!timeEntries)
        timeEntries = new TimeEntry()

    showEntries()
}

function updateTimeEntries() {
    repository.update(timeEntries)
    showEntries()
}

function addTime(time) {
    timeEntries.entries.push(time);
    updateTimeEntries()
}

function removeTime(index) {
    if (index === -1)
        return

    timeEntries.entries.splice(index, 1)
    updateTimeEntries()
}

function editTime(index, newValue) {
    if (index === -1)
        return

    if (timeEntries.entries.length <= index)
        return
    
    timeEntries.entries[index] = newValue
    updateTimeEntries()
}

function showEntries() {
    // Clear the entry table
    const tbody = tableEntries.querySelector('tbody')
    tbody.replaceChildren()

    // For each entry item add a new TimeEntry
    timeEntries.entries.forEach((entry, index) => {
        // odd index means new table row
        const isNewRow = (index + 1) % 2 != 0

        // create and add the TimeEntry on the table
        const td = document.createElement('td')

        const timeEntry = new TimeEntryView(td, entry, index)
        timeEntry.onDelete = (index) => { removeTime(index) }
        timeEntry.onEditEnd = (index, newValue) => { editTime(index, newValue) }

        let tr = null

        if (isNewRow) {
            tr = document.createElement('tr')
            tr.append(td)
            tbody.append(tr)
        } else {
            tr = tbody.lastChild
            tr.append(td)
        }
    })

    // calculates the time done
    const elapsedTimeEntries = subtractPairsOfEntries(timeEntries.entries)
    const timeDone = sumTimeEntries(elapsedTimeEntries)
    spanDone.innerText = timeDone

    // calculates the time left
    const timestampDone = Timestamp.parse(timeDone)
    const timestampLeft = Timestamp.subtract(REGULAR_TIME, timestampDone)

    if (timestampLeft.hours < 0 || timestampLeft.minutes < 0)
        spanLeft.innerText = '00:00'
    else
        spanLeft.innerText = timestampLeft.toString()

    // calculates the extra time elapsed
    const isRegularTimeExceed = timestampDone.isHigher(REGULAR_TIME)

    if (isRegularTimeExceed) {
        spanExtra.innerText = Timestamp.subtract(timestampDone, REGULAR_TIME).toString()
    } else {
        spanExtra.innerText = '00:00'

        // estimates what time to exit to achieve the time left
        if (timeEntries.entries.length > 2 && (timeEntries.entries.length % 2) != 0) {
            const timestampEstimateExit = Timestamp.parse(timeEntries.entries[timeEntries.entries.length - 1])
            timestampEstimateExit.add(timestampLeft)
            const td = document.createElement('td')
            td.textContent = timestampEstimateExit.toString()
            td.className = 'time-estimate'
            tbody.lastElementChild.append(td)
        }
    }
}

function subtractPairsOfEntries(entries) {
    const result = []

    entries.forEach((time, index) => {
        const isExit = (index + 1) % 2 == 0

        if (isExit) {
            const timestamp1 = Timestamp.parse(time)
            const timestamp2 = Timestamp.parse(entries[index - 1])

            timestamp1.subtract(timestamp2)
            result.push(timestamp1.toString())
        }
    })

    return result
}

function sumTimeEntries(entries) {
    const timestamp = new Timestamp()

    entries.forEach((time, index) => {
        timestamp.add(Timestamp.parse(time))
    })

    return timestamp.toString()
}

buttonRegister.addEventListener('click', event => {
    console.log('button clicked')
    console.log(event)

    addTime(timeField.input.value)
})

anchorHistory.addEventListener('click', event => {
    window.app.openHistory()
})

loadEntries()