class TimeEntryView {
    dom = {}
    #index = -1
    onDelete = null
    onEditEnd = null

    get template() { return `
        <div>
            <span class="time"></span>
            <input class="time" type="time" hidden disabled>
            <a class="delete">❌</a>
            <a class="edit">📝</a>
        </div>
    `}

    constructor(parent, time, index) {
        this.#index = index

        const element = document.createElement('div')
        element.insertAdjacentHTML('afterbegin', this.template)
        this.dom.spanTime = element.querySelector('span.time')
        this.dom.inputTime = element.querySelector('input.time')
        this.dom.linkDelete = element.querySelector('a.delete')
        this.dom.linkEdit = element.querySelector('a.edit')

        this.dom.spanTime.innerText = time

        this.dom.linkEdit.addEventListener('click', () => { this.clickEdit() })
        this.dom.linkDelete.addEventListener('click', () => { this.clickDelete() })
        this.dom.inputTime.addEventListener('blur', () => { this.edit() })
        this.dom.inputTime.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                console.info('type ENTER')
                event.preventDefault()
                this.dom.inputTime.blur()
            }
        })

        parent.append(element.firstElementChild)
    }
    
    set editable(value) {
        if (value) {
            this.dom.spanTime.setAttribute('hidden', '')
            this.dom.inputTime.value = this.dom.spanTime.innerText
            this.dom.inputTime.removeAttribute('hidden')
            this.dom.inputTime.removeAttribute('disabled')
            this.dom.inputTime.focus()
            this.dom.linkEdit.setAttribute('hidden', '')
            this.dom.linkDelete.setAttribute('hidden', '')

        } else {
            this.dom.spanTime.removeAttribute('hidden', '')
            this.dom.inputTime.value = ''
            this.dom.inputTime.setAttribute('hidden', '')
            this.dom.inputTime.setAttribute('disabled', '')
            this.dom.linkEdit.removeAttribute('hidden')
            this.dom.linkDelete.removeAttribute('hidden')
        }
    }

    edit() {
        const newTime = this.dom.inputTime.value
        console.log('INPUT TIME value changed: ' + newTime)

        if (this.onEditEnd)
            this.onEditEnd(this.#index, newTime)

        this.editable = false
    }

    clickEdit() {
        console.log('ON CLICK EDIT')
        this.editable = true
    }

    clickDelete() {
        console.log('ON CLICK DELETE')

        if (this.onDelete)
            this.onDelete(this.#index)
    }
}

export { TimeEntryView }