import * as THREE from 'three'

// Objects
import Audio from '../objects/audio'
import Canvas from '../objects/canvas'
import Sphere from '../objects/sphere'
import Video from '../objects/video'
import panoramicImage from '../objects/image'
import Button from '../objects/button'

// json
import data from '../../../assets/json/data'

class Stage {
    constructor(scene, camera, stageName) {
        this.scene = scene
        this.camera = camera
        this.canvas = new Canvas(3840, 2160)
        this.stages = data.stages
        this.stageName = stageName
    }

    fillCanvas() {
        this.texture = new THREE.CanvasTexture(this.canvas.el)

        this.stages.forEach((stage) => {
            if(stage.name === this.stageName) {
                
                this.outerImage = new panoramicImage(this.canvas.context, this.texture, stage.outerImage)
                this.outerImage.init()

                if(typeof stage.videos !== 'undefined') {
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
            }
        })

        return this.texture
    }

    createStage() {
        this.sphere = new Sphere(this.scene, this.fillCanvas())
        this.sphere.create()
    }

    addButtons() {
        this.stages.forEach((stage) => {
            if(stage.name === this.stageName && typeof stage.buttons !== 'undefined') {
                this.buttons = []
                stage.buttons.forEach((button) => {
                    const id = new Button({
                        scene: this.scene,
                        type: button.type,
                        linkTo: button.linkTo,
                        buttonName: button.name,
                        radius: button.radius,
                        x: button.x,
                        y: button.y,
                        z: button.z,
                        datGUI: button.datGUI
                    })
                    id.init()
                    this.buttons.push(id)
                })               
            }
        })
    }

    addAudio() {
        this.stages.forEach((stage) => {
            if(stage.name === this.stageName && typeof stage.sounds !== 'undefined') {
                this.sounds = []
                stage.sounds.forEach((sound) => {
                    const id = new Audio({
                        camera: this.camera,
                        name: sound.name,
                        audioSource: sound.source,
                        x: sound.x,
                        y: sound.y,
                        z: sound.z,
                        audioDistance: sound.audioDistance,
                        datGUI: sound.datGUI                             
                    })
                    id.init()
                    this.sounds.push(id)
                })  
            }
        })
    }    

    init() {
        this.canvas.create()
        this.createStage()
        this.addButtons()
        this.addAudio()
    }
}

export default Stage
