import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'
import { TimelineMax } from 'gsap'

// scenes
import Stage from './stages/stage'

// json
import data from '../../assets/json/data'

class WebGL {
    constructor() {
        this.raf = 0;

        this.scene = new THREE.Scene()
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.stats = new Stats()

        this.stages = data.stages

        this.groups = []

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        this.startButton = document.querySelector('#button')

        this.tl = new TimelineMax();

        this.objHidden = true
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 1)
    }

    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.controls.enableDamping = true;
        this.controls.dampingFactor = .3;
    }

    initStages() {
        this.stages.forEach((stage) => {
            const id = new Stage(this.scene, this.camera, stage.name)
            id.init()

            this.group = new THREE.Group()
        
            this.group.add(id.sphere.mesh)

            if (id.buttons) {
                id.buttons.forEach((button) => this.group.add(button.mesh))
            }

            this.group.name = stage.name

            this.group.traverse((child) => {
                child.layers.set(stage.id)
            })

            // if (stage.id !== 0) {
            //     this.group.visible = false
            // }

            this.group.layers.set(stage.id)

            if (id.sounds) {
                id.sounds.forEach((sound) => {
                    this.group.add(sound.mesh)
                })
            }

            this.groups.push(this.group)

            if (this.group.visible !== false) {
                this.scene.add(this.group)
            }
        })
    }

    // startSound() {
    //     // this.groups.forEach((group) => {
    //     //     if(group.visible === true) {
    //     //         console.log('is zichtbaar')
    //     //     } else if (group.visible === false) {
    //     //         console.log('is niet zichtbaar')
    //     //     }
    //     // })
    // }

    events() {
        this.startButton.addEventListener('click', this.startExperience)
        window.addEventListener('click', this.onButtonClick)
        window.addEventListener('resize', this.onResize)
    }

    startExperience = ()    => {
        this.start()
        this.initStages()
    }


    onButtonClick = (e) => {
        e.preventDefault()

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.groups.forEach((group) => {
            this.intersects = this.raycaster.intersectObjects(group.children)
            this.intersects.forEach((intersect) => {
                this.stages.forEach((stage) => {
                    if (intersect.object.userData === stage.name) {   

                        this.camera.layers.disableAll()
                        this.camera.layers.enable(stage.id)

                    }
                })
            })
        })
    }

    onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    statsUI = () => {
        this.stats.dom.style.top = null
        this.stats.dom.style.bottom = 0
    }

    render = () => {
        this.raf = undefined
    
        this.renderer.render(this.scene, this.camera)
    
        this.start()

        this.stats.update()
        this.controls.update()
    }

    start = () => {
        if (!this.raf) {
            this.raf = window.requestAnimationFrame(this.render);
        }
    }

    stop = () => {
        if (this.raf) {
            window.cancelAnimationFrame(this.raf);
            this.raf = undefined;
        }
    }

    init() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
        document.body.appendChild(this.stats.dom)

        this.initCamera()
        this.initControls()
        this.stop()
        this.events()
        this.statsUI()
    }
}

export default WebGL