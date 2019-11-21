import * as THREE from 'three'
import * as dat from 'dat.gui'

class Audio {
    constructor(options) {
        this.camera = options.camera

        this.audioName = options.name
        this.audioSource = options.audioSource

        this.x = options.x
        this.y = options.y
        this.z = options.z
        
        this.audioDistance = options.audioDistance

        this.datGUI = Boolean(options.datGUI)

        this.listener = new THREE.AudioListener()
        this.camera.add(this.listener)
        this.sound = new THREE.PositionalAudio(this.listener)

    }

    loadAudio() {
        this.audioLoader = new THREE.AudioLoader()
        this.audioLoader.load(this.audioSource, (buffer) => {
            this.sound.setBuffer(buffer)
            this.sound.setRefDistance(this.audioDistance)
            this.sound.loop = true
        })
    }

    createAudioSphere() {
        this.sphere = new THREE.SphereGeometry(1, 32, 32)
        this.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff0000
        })
        this.mesh = new THREE.Mesh(this.sphere, this.material)

        this.sound.name = this.audioName

        this.mesh.userData = 'audio'

        this.mesh.position.x = this.x
        this.mesh.position.y = this.y
        this.mesh.position.z = this.z        

        this.mesh.add(this.sound)   

        this.mesh.visible = false
    }

    addGUI() {
        if(this.datGUI === true) {
            this.gui = new dat.GUI()

            this.mesh.visible = true

            this.audioGUI = this.gui.addFolder(this.audioName)

            this.values = {
                add: () => {
                    navigator.clipboard.writeText(`"x": ${Math.round(this.mesh.position.x)},
                        "y": ${Math.round(this.mesh.position.y)},
                        "z": ${Math.round(this.mesh.position.z)},
                        "audioDistance": ${Math.round(this.sound.getRefDistance() * 100) / 100},`).then(() => {
                            console.log('x, y, z and distance copied to clipboard')
                        })
                }   
            }

            this.setAudioDistance = {
                "distance": this.audioDistance
            }

            this.audioGUI.add(this.mesh.position, 'x').min( -100 ).max( 100 ).step( 0.5 ).name('x').listen()
            this.audioGUI.add(this.mesh.position, 'y').min( -100 ).max( 100 ).step( 0.5 ).name('y').listen()
            this.audioGUI.add(this.mesh.position, 'z').min( -100 ).max( 100 ).step( 0.5 ).name('z').listen()

            this.audioGUI.add(this.setAudioDistance, "distance").min(0).max(10).step(0.05).name('Audio Distance').onChange((value) => {
                this.sound.setRefDistance(value)
            })

            this.audioGUI.add(this.values, 'add').name('get values: x, y, z')
            
            this.audioGUI.open()
        }
    }        

    init() {
        this.loadAudio()
        this.createAudioSphere()
        this.addGUI()
    }
}

export default Audio