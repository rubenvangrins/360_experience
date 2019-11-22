import * as THREE from 'three'
import * as dat from 'dat.gui'
import TweenMax from 'gsap'

//json
import data from '../../../assets/json/data'

class Button {
    constructor(options) {
        this.type = options.type        
        this.buttonName = options.buttonName
        this.linkTo = options.linkTo

        this.radius = options.radius
        this.x = options.x
        this.y = options.y
        this.z = options.z

        this.stages = data.stages

        this.datGUI = Boolean(options.datGUI)
    }

    createButton() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true
        })

        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32)

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.name = this.buttonName

        this.stages.forEach((stage) => {
            stage.buttons.forEach((button) => {
                if(button.type === 'nav') {
                    this.mesh.userData = this.linkTo
                } else if (button.type === 'product') {
                    this.mesh.userData = this.linkTo
                }
            })
        })

        this.mesh.position.x = this.x
        this.mesh.position.y = this.y
        this.mesh.position.z = this.z
    }

    addGUI() {
        if(this.datGUI === true) {
            this.gui = new dat.GUI()

            this.button = this.gui.addFolder(this.buttonName)

            this.values = {
                add: () => {
                    navigator.clipboard.writeText(`"x": ${Math.round(this.mesh.position.x)},
                        "y": ${Math.round(this.mesh.position.y)},
                        "z": ${Math.round(this.mesh.position.z)},`).then(() => {
                            console.log('x, y, z copied to clipboard')
                        })
                }
            }

            this.button.add(this.mesh.position, 'x', -100, 100).name('x').listen()
            this.button.add(this.mesh.position, 'y', -100, 100).name('y').listen()
            this.button.add(this.mesh.position, 'z', -100, 100).name('z').listen()
            this.button.add(this.values, 'add').name('get values: x, y, z')

            this.button.open()
        }
    }

    // buttonPulse() {
    //     TweenMax.to(this.mesh.scale, 1, {x:1.2, y:1.2, z:1.2, repeat:-1, yoyo:true})
    //     TweenMax.from(this.mesh.material, 1, {opacity: .8, repeat: -1, yoyo: true}) 
    // }

    init() {
        this.createButton()
        this.addGUI()
        // this.buttonPulse()
    }
}

export default Button