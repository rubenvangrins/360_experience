  
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

class Label {
    constructor(_options) {
        this.scene = _options.scene
        this.group = _options.group
        
        this.positionX = _options.x
        this.positionY = _options.y
        this.positionZ = _options.z
        this.scalePercantage = _options.scale

        this.loader = new SVGLoader()
    }

    load = () => {
        this.loader.load(
            '../../src/assets/svg/eye.svg',

            (data) => {
                const paths  = data.paths;

                this.instance = new THREE.Group();

                paths.forEach((path) => {

                    const material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    })

                    const shapes = path.toShapes(true);

                    shapes.forEach((shape) => {
                        const geometry = new THREE.ShapeBufferGeometry(shape)
                        const mesh = new THREE.Mesh(geometry, material)

                        this.instance.scale.set(this.scalePercantage, this.scalePercantage, this.scalePercantage);
                        this.instance.position.x = this.positionX
                        this.instance.position.y = this.positionY
                        this.instance.position.z = this.positionZ

                        this.instance.add(mesh)
                    })
                })
                this.scene.add(this.instance)
            }
        )
    }

    init () {
        this.load();
    }
}

export default Label