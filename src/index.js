// Styles
import './index.scss'

// Components
import Loading from './components/loading/loading'
import WebGL from './components/webgl/webgl'

// Loading
let loading = new Loading()
loading.init()

// WebGL
let iWebGL = new WebGL()
iWebGL.init()