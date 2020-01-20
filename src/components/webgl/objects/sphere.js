import * as THREE from 'three'

class Sphere {
    constructor(scene, canvasTexture) {
        this.textureCanvas = canvasTexture
        this.scene = scene
    }

    create() {
        this.textureCanvas.minFilter = THREE.LinearFilter

        this.material = new THREE.MeshBasicMaterial({
            map: this.textureCanvas,
            transparent: true
        })

        this.geometry = new THREE.SphereGeometry(10, 32, 32).scale(-1, 1, 1)

        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
}

export default Sphere