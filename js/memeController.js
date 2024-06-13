'use strict'

var gElCanvas
var gCtx

function onInit() {
    console.log('initializing...')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}

function renderMeme() {
    console.log('rendering meme!')
    const meme = getMeme()
    const elImg = new Image()
    elImg.src = `meme-imgs/meme-imgs (square)/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}