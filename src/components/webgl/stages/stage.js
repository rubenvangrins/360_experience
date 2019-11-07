import * as THREE from 'three'

// Objects
import Canvas from '../objects/canvas'
import Sphere from '../objects/sphere'
import Video from '../objects/video'
import panoramicImage from '../objects/image'

// json
import data from '../../../assets/json/data'

class Stage {
    constructor(scene, stageName) {
        this.scene = scene;
        this.canvas = new Canvas(3840, 2160)
        this.stages = data.stages
        this.stageName = stageName
    }

    fillCanvas() {
        this.texture = new THREE.CanvasTexture(this.canvas.el)

        this.stages.forEach((stage) => {
            if(stage.name === this.stageName) {

                this.outerImage = new panoramicImage(this.canvas.context, stage.outerImage)
                this.outerImage.init()

                stage.videos.forEach((video) => {
                     const id = new Video(
                        this.canvas.context,
                        this.texture,
                        video.url,
                        video.x,
                        video.y,
                        video.width,
                        video.height                        
                    )
                    id.init()
                })
            }
        })

        return this.texture
    }

    createStage() {
        this.sphere = new Sphere(this.scene, this.fillCanvas());
        this.sphere.create()
    }

    init() {
        this.canvas.create()
        this.createStage()
    }
}

export default Stage

