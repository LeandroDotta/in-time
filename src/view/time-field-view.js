import { formatTime } from '../utils/format-utils.js'

class TimeFieldView {
    interval = null;
    timeoutId = null;
    input = null;

    constructor() {
        this.input = document.getElementById('time')
        this.input.addEventListener('focus', () => {
            console.log('focusin!')
            clearTimeout(this.timeoutId)
            clearInterval(this.interval)
            this.interval = null
            this.input.removeAttribute('readonly')
        })
        this.input.addEventListener('blur', () => {
            console.log('focusout!')
            clearTimeout(this.timeoutId)
            this.timeoutId = setTimeout(() => { this.resetUpdateRoutine() }, 5000)
            this.input.setAttribute('readonly', '')
        })

        this.resetUpdateRoutine()
    }

    resetUpdateRoutine() {
        if (this.interval)
            return

        this.#updateTime()
        this.interval = setInterval(() => { this.#updateTime() }, 3000)
    }

    #updateTime() {
        this.input.value = formatTime(new Date())
    }
}

export { TimeFieldView }