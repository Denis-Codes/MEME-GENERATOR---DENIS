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
    console.log('Rendering meme...')
    const meme = getMeme()
    console.log('meme: ', meme)

    const img = gImgs


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

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
    
}




