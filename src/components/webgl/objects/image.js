class panoramicImage{
    constructor(ctx, imageSource) {
        this.imageSource = imageSource

        this.ctx = ctx

        this.stageImage = new Image()
    }

    createImage() {       
        this.stageImage.src = this.imageSource

        this.stageImage.onload = () => {
            this.ctx.drawImage(this.stageImage, 0, 0, this.stageImage.width, this.stageImage.height)
        }
    }

    init() {
        this.createImage()
    }
}

export default panoramicImage