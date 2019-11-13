import * as THREE from 'three'
import * as dat from 'dat.gui'
import TweenMax from 'gsap'

class Button {
    constructor(scene, type, buttonName, radius,x, y, z, datGUI) {
        this.scene = scene
        this.type = type        
        this.buttonName = buttonName

        this.radius = radius
        this.x = x
        this.y = y
        this.z = z

        this.datGUI = Boolean(datGUI)
    }

    createButton() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true
        })

        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32)

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.name = this.buttonName

        this.mesh.position.x = this.x
        this.mesh.position.y = this.y
        this.mesh.position.z = this.z
    }

    addGUI() {
        if(this.datGUI === true) {
            this.gui = new dat.GUI()

            let button = this.gui.addFolder(this.buttonName)

            button.add(this.mesh.position, 'x', -100, 100).name('x').listen()
            button.add(this.mesh.position, 'y', -100, 100).name('y').listen()
            button.add(this.mesh.position, 'z', -100, 100).name('z').listen()

            button.open()
        }
    }

    buttonPulse() {
        TweenMax.to(this.mesh.scale, 1, {x:1.2, y:1.2, z:1.2, repeat:-1, yoyo:true})
        TweenMax.from(this.mesh.material, 1, {opacity: .8, repeat: -1, yoyo: true}) 
    }

    init() {
        this.createButton()
        this.addGUI()
        this.buttonPulse()
    }
}

export default Button