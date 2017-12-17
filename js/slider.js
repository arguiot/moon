class Slider {
	constructor(s) {
		this.s = s
		this.i;
		this.slider = document.querySelector(s + ' .contain')
		this.slides = this.slider.children
		this.sArr   = Array.prototype.slice.call(this.slides)

		this.next = this.next.bind(this)
		this.prev = this.prev.bind(this)

		this._setSel()
		this._addEventListeners()
		this._setI()
	}

	_addEventListeners() {
		document.querySelector(this.s + ' .next').addEventListener('click', this.next)
		document.querySelector(this.s + ' .prev').addEventListener('click', this.prev)
	}

	_setSel() {
		this.sel    = document.querySelector(this.s + ' .selected')
		this.selI   = this.sArr.indexOf(this.sel)
		this.text   = document.querySelector(this.s + ' .text .' + this.sel.classList[0])
	}

	_setI() {
		clearInterval(this.i)
		this.i = setInterval(this.next,5000)
	}

	next() {
		this.sel.classList.remove('selected')
		this.text.classList.remove('selected')
		if (this.selI < this.sArr.length-1) {
			this.sArr[this.selI + 1].classList.add('selected')
		} else {
			this.sArr[0].classList.add('selected')
		}
		this._setSel()
		this.text.classList.add('selected')
		this._setI()
	}

	prev() {
		this.sel.classList.remove('selected')
		this.text.classList.remove('selected')
		if (this.selI > 0) {
			this.sArr[this.selI - 1].classList.add('selected')
		} else {
			this.sArr[this.sArr.length-1].classList.add('selected')
		}
		this._setSel()
		this.text.classList.add('selected')
		this._setI()
	}
}
