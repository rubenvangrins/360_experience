class panoramicImage{
    constructor(ctx, texture, imageSource) {
        this.imageSource = imageSource

        this.ctx = ctx
        this.texture = texture

        this.stageImage = new Image()
    }

    createImage() {       
        this.stageImage.src = this.imageSource

        this.stageImage.onload = () => {
            this.ctx.drawImage(this.stageImage, 0, 0, this.stageImage.width, this.stageImage.height)

            this.texture.needsUpdate = true
        }
    }

    init() {
        this.createImage()
    }
}

export default panoramicImage