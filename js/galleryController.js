'use strict'

function renderGallery() {
    var elGalleryContainer = document.querySelector('.gallery-container')
    var imgs = gImgs
    const strHTMLs = imgs.map((img) => {
        return `<img src="meme-imgs/meme-imgs (square)/${img.id}.jpg" alt="" onclick="onSelectImg(this)">`
    })
    elGalleryContainer.innerHTML = strHTMLs.join('')
}