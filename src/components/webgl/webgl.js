import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'

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
            const id = new Stage(this.scene, stage.name)
            id.init()
<<<<<<< Updated upstream
=======

            this.group = new THREE.Group()
        
            this.group.add(id.sphere.mesh)

            if (id.buttons) {
                id.buttons.forEach((button) => this.group.add(button.mesh))
            }

            this.group.name = stage.name

            this.group.traverse((child) => {
                child.layers.set(stage.id)
            })

            this.groups.push(this.group)
            this.scene.add(this.group)        
>>>>>>> Stashed changes
        })
    }

    events() {
<<<<<<< Updated upstream
        window.addEventListener('resize', this.onResize);
    }

=======
        window.addEventListener('click', this.onButtonClick)
        window.addEventListener('resize', this.onResize)
    }

    onButtonClick = (e) => {
        e.preventDefault()

        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        this.groups.forEach((group) => {
            this.intersects = this.raycaster.intersectObjects( group.children );
            this.intersects.forEach((intersect) => {
                this.stages.forEach((stage) => {
                    if(intersect.object.name === stage.name) {
                        this.camera.layers.disableAll()
                        this.camera.layers.enable(stage.id)
                    }
                })
            })
        })
    }

>>>>>>> Stashed changes
    onResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render = () => {
        this.raf = undefined;
    
        this.renderer.render(this.scene, this.camera);
    
        this.start();

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
        this.start()
        this.events()
        this.initStages()
    }
}

export default WebGL