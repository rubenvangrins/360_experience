class Canvas {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

    get el() {
        return this.canvas
    }

    get context() {
        return this.ctx
    }

    create() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width  = this.width
        this.canvas.height = this.height
    }
}

export default Canvas


