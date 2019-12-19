import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'
import { TweenMax, TimelineMax, Expo } from 'gsap'

// scenes
import Stage from './stages/stage'

// json
import data from '../../assets/json/data'

// Products
import Products from '../products/product'

class WebGL {
    constructor() {
        this.raf = 0

        this.scene = new THREE.Scene()
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })

        this.stats = new Stats()

        this.dataStages = data.stages
        this.dataProducts = data.products

        this.groups = []
        this.stages = []
        this.currentSound = []

        this.startButton = document.querySelector('.loading--button')

        this.activeGroup = null
        this.activeSound = null

        this.activeGroup = null

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        this.tl = new TimelineMax({ paused: true })
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 1)
    }

    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.controls.enableDamping = true
        this.controls.dampingFactor = .3
    }

    initStages() {
        this.dataStages.forEach((stage) => {
            const id = new Stage(this.scene, this.camera, stage.name)
            id.init()

            this.group = new THREE.Group()
        
            this.group.add(id.sphere.mesh)

            if (id.buttons) {
                id.buttons.forEach((button) => this.group.add(button.mesh))
            }

            if (id.sounds) {
                id.sounds.forEach((sound) => this.group.add(sound.mesh))
            }

            this.group.name = stage.name

            if (stage.id !== 0) {
                this.group.visible = false

                this.group.children.forEach((child) => {
                    child.material.opacity = 0
                })
            }

            this.groups.push(this.group)
            this.scene.add(this.group)
            this.stages.push(id)
        })

        this.activeGroup = this.groups[0]
        this.activeStage = this.stages[0]
    }

    events() {
        // this.startButton.addEventListener('click', this.startSounds)
        window.addEventListener('click', this.changeScene)
        window.addEventListener('click', this.openProduct)
        window.addEventListener('resize', this.onResize)
    }

    startSounds = () => {           
        if (this.activeStage) {
            this.activeStage.sounds.forEach((stageSound) => {
                stageSound.sound.play()
            })
        }
    }

    openProduct = (e) => {
        e.preventDefault()

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.intersects = this.raycaster.intersectObjects(this.activeGroup.children)   
        
        this.intersects.forEach((intersect) => {
            if (intersect.object.name === 'button--product') {    

                this.dataProducts.forEach((product) => {

                    if (product.productName === intersect.object.userData) {
                        
                        const id = new Products({
                            productName: product.productName,
                            productImage: product.productImage,
                            productLabel: product.productLabel,
                            productQuote: product.productQuote,
                            productcontent: product.productcontent       
                        })

                        id.init()
                    }

                })

            }
        })
    }

    groupVisibilityFalse = () => {                       
        
    }

    changeScene = (e) => {    
        e.preventDefault()

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.intersects = this.raycaster.intersectObjects(this.activeGroup.children)

        this.intersects.forEach((intersect) => {

            if(intersect.object.name.startsWith("button--")) {
                let objectX = intersect.object.position.x,
                    objectY = intersect.object.position.y,
                    objectZ = intersect.object.position.z

                this.dataStages.forEach((dataStage) => {
                    if (intersect.object.userData === dataStage.name) {

                        /* Change stage */
                        if (intersect.object.userData === dataStage.name) { 

                            this.activeGroup.children.forEach((child) => {
                                child.material.opacity = 0
                                this.activeGroup.visible = false
                            })                       

                            this.groups.forEach((group) => {
                                if (group.name === dataStage.name) {
                                    group.visible = true

                                    TweenMax.from(group.position, .4, {
                                        x: objectX * 1.05,
                                        y: objectY * 1.05,
                                        z: objectZ * 1.05
                                    })

                                    group.children.forEach((child) => {                              
                                        TweenMax.to(child.material, .2, {
                                            opacity: 1,
                                        })
                                    })  

                                    this.activeGroup = group
                                }
                            })

                        } 

                        /* Audio change and/or repeat from (current) TimeStamp */
                        if (this.activeStage) {
                            this.activeStage.sounds.forEach((stageSound) => {
                                this.soundName = stageSound.audioName
                                this.currentTime = stageSound.sound.context.currentTime
                            })
                        }

                        this.stages.forEach((stage) => {
                            if (stage.sounds) {
                                stage.sounds.forEach((stageSound) => {
                                    stageSound.sound.pause()
                                    if (this.activeStage.stageName === stageSound.mesh.parent.name) {
                                        this.soundMemory = {
                                            name: stageSound.audioName,
                                            time: stageSound.sound.context.currentTime
                                        }
                                        this.currentSound.push(this.soundMemory)
                                    }
                                })

                                if (this.activeGroup.name === stage.stageName) {           
                                    stage.sounds.forEach((stageSound) => {
                                        this.currentSound.forEach((sound) => {
                                            if (stageSound.audioName == sound.name) {
                                                stageSound.sound.offset = sound.time
                                            }
                                        })

                                        stageSound.sound.play()
                                    })
                                }
                            }
                        })
                    } 
                })
            }
        })
    }

    onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // statsUI = () => {
    //     this.stats.dom.style.top = null
    //     this.stats.dom.style.bottom = 0
    // }

    render = () => {
        this.raf = undefined
    
        this.renderer.render(this.scene, this.camera)
    
        this.start()

        // this.stats.update()
        this.controls.update()
    }

    start = () => {
        if (!this.raf) {
            this.raf = window.requestAnimationFrame(this.render)
        }
    }

    stop = () => {
        if (this.raf) {
            window.cancelAnimationFrame(this.raf)
            this.raf = undefined
        }
    }

    init() {
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        document.body.appendChild(this.renderer.domElement)
        // document.body.appendChild(this.stats.dom)

        this.initCamera()
        this.initControls()
        this.initStages()

        this.events()
        // this.statsUI()

        this.start()
    }
}

export default WebGL