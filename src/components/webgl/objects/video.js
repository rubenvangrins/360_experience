class Video{
    constructor(ctx, texture, videoSource, x, y, w, h) {
        this.videoSource = videoSource
        this.size = {
            w,
            h
        }
        this.position = {
            x,
            y
        }
        this.fps = 30
        this.raf = 0
        this.ctx = ctx
        this.texture = texture
    }

    createVideo() {
        this.video = document.createElement("video")
        this.video.src = this.videoSource

        this.video.muted = true
        this.video.loop = true

        this.video.play()
    }

    positionVideo() {
        this.ctx.drawImage(this.video, this.position.x, this.position.y, this.size.w, this.size.h)
        this.texture.needsUpdate = true
    }

    run() {
        setTimeout(() => {
            this.raf = window.requestAnimationFrame(this.run.bind(this))
            this.positionVideo()
        }, 1000 / this.fps)
    }
    
    init() {
        this.createVideo()
        this.positionVideo()
        this.run()
    }
}

export default Video