import * as THREE from 'three'

// Objects
import Audio from '../objects/audio'
import Canvas from '../objects/canvas'
import Sphere from '../objects/sphere'
import Video from '../objects/video'
import panoramicImage from '../objects/image'
import Marker from '../objects/marker'

// json
import data from '../../../assets/json/data'

class Stage {
    constructor(_options) {
        this.scene = _options.scene
        this.camera = _options.camera
        this.stageName = _options.stageName
        this.group = _options.group

        this.canvas = new Canvas(7680, 3840)
        this.stages = data.stages
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

    addMarker() {
        this.stages.forEach((stage) => {
            if(stage.name === this.stageName && typeof stage.markers !== 'undefined') {
                this.markers = []
                stage.markers.forEach((marker) => {
                    const id = new Marker({
                        type: marker.type,
                        name: marker.name,
                        linkTo: marker.linkTo,
                        x: marker.x,
                        y: marker.y,
                        z: marker.z,
                        scale: marker.scale,
                        datGUI: marker.datGUI
                    })
                    id.init()
                    this.markers.push(id)
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
        this.addAudio()
        this.addMarker()
    }
}

export default Stage
