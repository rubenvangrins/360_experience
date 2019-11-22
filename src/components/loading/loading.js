import { TimelineMax, Expo } from 'gsap';

class Loading {
    constructor() {
        this.loadingContent = document.querySelector('.loading--inner')

        this.buttonStart = document.querySelector('.loading--button')
        this.loadingScreen =  document.querySelector('.loading')

        this.tl = new TimelineMax({ paused: true });
    }

    loadDocument() {
        this.tl.to(this.loadingContent, 2, {
            opacity: 1,
            delay: 0.5
        })

        this.tl.play();
    }

    event() {
        this.buttonStart.addEventListener('click', this.loadCanvas)
    }

    loadCanvas = () => {    
        this.canvas =  document.querySelector('canvas')

        this.tl
            .to(this.loadingContent, 1.5, {
                yPercent: -100,
                ease: Expo.easeInOut,
            })
            .to(this.loadingScreen, 1, {
                opacity: 0,
                ease: Expo.easeInOut,                
            }, '-=1')
            .set(this.loadingScreen, {
                yPercent: -100
            })
        this.tl.play();
    }

    init() {
        this.loadDocument()
        this.event()
    }
}

export default Loading