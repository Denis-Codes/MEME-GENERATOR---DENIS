'use strict'

function renderGallery() {
    var elGalleryContainer = document.querySelector('.gallery-container')
    var imgs = gImgs.filter(img => 
        gFilterBy === '' || img.keywords.some(keyword => keyword.toLowerCase().includes(gFilterBy))
    )
    const strHTMLs = imgs.map((img) => {
        return `<img src="meme-imgs/meme-imgs (square)/${img.id}.jpg" alt="" onclick="onImgSelect(this)" data-img-id="${img.id}" class="meme-${img.id}">`
    })
    elGalleryContainer.innerHTML = strHTMLs.join('')
}