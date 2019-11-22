import { TimelineMax, Expo } from 'gsap'

class Product {
    constructor(options) {
        /* Constuctor */
        this.name = options.productName
        this.image = options.productImage
        this.label = options.productLabel
        this.quote = options.productQuote
        this.content = options.productcontent

        /* HTML elements */
        this.productImage = document.querySelector('.product__image')
        this.productImageSrc = document.querySelector('.product__image img')
        this.productLabel = document.querySelector('.product__logo')
        this.productQuote = document.querySelector('.product__quote')
        this.productText = document.querySelector('.product__text')
        this.productClose = document.querySelector('.product__close')
        this.productDetail = document.querySelector('.product__detail')
        this.productContent = document.querySelector('.product__content')

        /* GSAP */
        this.tl = new TimelineMax({ paused: true })
    }

    addProductToHtml() {                    
        this.productImageSrc.src = this.image
        this.productLabel.src = this.label
        this.productQuote.append(this.quote)
        this.productText.append(this.content)
    }

    event() {
        this.productClose.addEventListener('click', this.closeProduct)
    }

    animate() {                                              
        this.tl
            .add(() => { 
                this.productDetail.style.display = 'block'
            })
            .to(this.productDetail, .5, {
                opacity: 1,
                ease: Expo.easeInOut
            })
            .to(this.productImage, 1, {
                opacity: 1,
                scale: 1,
                ease: Expo.easeInOut
            }, "-=.4")
            .to(this.productLabel, 1, {
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut
            }, "-=.7")
            .to(this.productQuote, 1, {
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut
            }, "-=.8")
            .to(this.productText, 1, {
                opacity: 1,
                y: 0,
                ease: Expo.easeInOut
            }, "-=.8")
        this.tl.play();
    }

    closeProduct = () => {
        this.tl
            .to(this.productContent, 1, {
                yPercent: -200,
                ease: Expo.easeInOut                
            })
            .to(this.productImage, 1, {
                yPercent: -200,
                ease: Expo.easeInOut  
            }, "-=1")
            .to(this.productDetail, .5, {
                opacity: 0,
                ease: Expo.easeInOut
            }, "-=.5")
            .add(() => { 
                this.productDetail.style.display = 'none'
                this.productImageSrc.src = ''
                this.productLabel.src = ''
                this.productQuote.innerHTML = ''
                this.productText.innerHTML = ''
            })
            .set(this.productContent, {
                opacity: 1,
                yPercent: 0
            })
            .set(this.productImage, {
                opacity: 0,
                yPercent: 0,
                scale: 1.1
            })
            .set(this.productLabel, {
                opacity: 0,
                yPercent: 0,
                y: 200
            })
            .set(this.productQuote, {
                opacity: 0,
                yPercent: 0,
                y: 200
            })
            .set(this.productText, {
                opacity: 0,
                yPercent: 0,
                y: 200
            })
        this.tl.play();

    }

    init() {
        this.addProductToHtml()
        this.animate()
        this.event()
    }
}

export default Product