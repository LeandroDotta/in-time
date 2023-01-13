class HistoryTableView {
    dom = {}

    get template() { return `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>Entry</th>
                    <th>Exit</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            </tbody
        </table>
    `}

    constructor (parent, timeEntries = []) {
        const element = document.createElement('div')
        element.insertAdjacentHTML('afterbegin', this.template)
        this.dom.tbody = element.querySelector('tbody')

        parent.append(element.firstElementChild)

        this.update(timeEntries)
    }

    update(timeEntries) {
        timeEntries.forEach((timeEntry, index) => {
            let columnCount = 0
            const tr = document.createElement('tr')

            const tdDate = document.createElement('td')
            tdDate.innerText = timeEntry.date
            tr.append(tdDate)
            columnCount++

            timeEntry.entries.forEach((entry, j) => {
                const td = document.createElement('td')
                td.innerText = entry
                tr.append(td)
                columnCount++
            })

            while (columnCount < 7) {
                const td = document.createElement('td')
                tr.append(td)
                columnCount++
            }

            const tdTotal = document.createElement('td')
            tdTotal.innerText = timeEntry.total.toString()
            tr.append(tdTotal)

            this.dom.tbody.append(tr)
        })
    }
}

export { HistoryTableView }