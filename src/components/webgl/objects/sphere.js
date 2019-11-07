import * as THREE from 'three'

class Sphere {
    constructor(scene, canvasTexture) {
        this.textureCanvas = canvasTexture
        this.scene = scene
    }

    create() {
        this.textureCanvas.minFilter = THREE.LinearFilter

        this.material = new THREE.MeshBasicMaterial({
            map: this.textureCanvas
        })

        this.geometry = new THREE.SphereGeometry(1, 32, 32).scale(-1, 1, 1)

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.scene.add(this.mesh)
    }
}

export default Sphere