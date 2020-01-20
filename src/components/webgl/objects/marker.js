import {
    Sprite,
    LinearFilter,
    TextureLoader,
    SpriteMaterial,
  } from 'three'
  import * as dat from 'dat.gui'

//json
import data from '../../../assets/json/data'

class Marker {
    constructor(_options) {
        this.type = _options.type
        this.name = _options.name
        this.linkTo = _options.linkTo
        this.positionX = _options.x
        this.positionY = _options.y
        this.positionZ = _options.z
        this.scale = _options.scale

        this.datGUI = Boolean(_options.datGUI)
    }

    setMarkers() {
        if(this.type === "navigation") {
            this.texture = new TextureLoader().load('../../src/assets/svg/nav.svg')
            this.texture.minFilter = LinearFilter
    
            this.material = new SpriteMaterial({ 
                map: this.texture,
                alphaTest: 0.5,
                transparent: false
            })
            
            this.marker = new Sprite(this.material)

            this.marker.userData = this.linkTo
        }

        if(this.type === "product") {
            this.texture = new TextureLoader().load('../../src/assets/svg/info.svg')
            this.texture.minFilter = LinearFilter
    
            this.material = new SpriteMaterial({ 
                map: this.texture,
                alphaTest: 0.5,
                transparent: false                
            })

            this.marker = new Sprite(this.material)

            this.marker.userData = this.linkTo
        }

        this.marker.name = this.name
        this.marker.type = this.type
        this.marker.position.set(this.positionX, this.positionY, this.positionZ)

        this.marker.scale.set(this.scale, this.scale, 1)
    }


    addGUI() {
        if(this.datGUI === true) {
            this.gui = new dat.GUI()

            this.button = this.gui.addFolder(this.name)

            this.values = {
                add: () => {
                    navigator.clipboard.writeText(`"x": ${Math.round(this.marker.position.x)},
                        "y": ${Math.round(this.marker.position.y)},
                        "z": ${Math.round(this.marker.position.z)},`).then(() => {
                            console.log('x, y, z copied to clipboard')
                        })
                }
            }

            this.button.add(this.marker.position, 'x', -10, 10).name('x').listen()
            this.button.add(this.marker.position, 'y', -10, 10).name('y').listen()
            this.button.add(this.marker.position, 'z', -10, 10).name('z').listen()
            this.button.add(this.values, 'add').name('get values: x, y, z')

            this.button.open()
        }
    }    

    init() {
        this.setMarkers()
        this.addGUI()
    }
}

export default Marker