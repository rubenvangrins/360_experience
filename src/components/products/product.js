class Product {
    constructor(options) {
        this.productName = options.productName
        this.productImage = options.productImage
        this.productLabel = options.productLabel
        this.productQuote = options.productQuote
        this.productContent = options.productcontent
    }

    create() {
        let productImage = document.querySelector('.product__image img'),
            productLabel = document.querySelector('.product__logo'),
            productQuote = document.querySelector('.product__quote'),
            productContent = document.querySelector('.product__text'),
            productClose = document.querySelector('.product__close')
                    
        productImage.src = this.productImage
        productLabel.src = this.productLabel
        productQuote.append(this.productQuote)
        productContent.append(this.productContent)

        productClose.addEventListener('click', () => {
            document.querySelector('.product__detail').style.display = 'none'

            productImage.src = ''
            productLabel.src = ''
            productQuote.innerHTML = ''
            productContent.innerHTML = ''
        })
    }
}

export default Product