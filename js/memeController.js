'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gMeme.selectedImgId = gImgs[15].id

    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const img = getImageById(meme.selectedImgId)

    if (!img) {
        console.error('Image not found!')
        return
    }

    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
}

function onTextChange() {
    const topText = document.querySelector('.top-text').value
    setLineTxt(topText)
    renderMeme()
}

function onBottomTextChange() {
    const bottomText = document.querySelector('.bottom-text').value
    setBottomLineTxt(bottomText)
    renderMeme()
}

function onImgSelect(elImg) {
    setImg(elImg)
    renderMeme()
}

// function onSwitchView(elBtn) {
//     console.log('switching view')
//     if (elBtn.innerText === 'Gallery') {
//         var elEditorContainer = document.querySelector('.editor')
//         elEditorContainer.classList.toggle('hidden')
//     } else {
//         var elGalleryContainer = document.querySelector('.gallery')
//         elGalleryContainer.classList.toggle('hidden')
//     }
// }

function onDownloadImg(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onIncreaseFont() {
    changeFontSize(2)
}

function onDecreaseFont() {
    changeFontSize(-2)
}

function onAddLine() {
    console.log('adding line')
    addLine()
    renderMeme()
}

// function onSwitchLine() {
//     console.log('switching lines')
//     switchLine()
// }

