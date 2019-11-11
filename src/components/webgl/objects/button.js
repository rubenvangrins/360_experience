import * as THREE from 'three'
import * as dat from 'dat.gui'

class Button {
    constructor(scene, buttonName, radius,x, y, z, datGUI) {
        this.scene = scene
        this.radius = radius
        this.x = x
        this.y = y
        this.z = z

        this.datGUI = Boolean(datGUI)

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()

        this.buttonName = buttonName
    }

    createButton() {
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        })

        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32)

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.position.x = this.x
        this.mesh.position.y = this.y
        this.mesh.position.z = this.z

        this.scene.add(this.mesh)        
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

    init() {
        this.createButton()

        this.addGUI()
    }
}

export default Button