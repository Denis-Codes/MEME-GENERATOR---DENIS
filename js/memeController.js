'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gMeme.selectedImgId = gImgs[1].id

    renderMeme()
    renderGallery()
    updateTextInput()
}

function renderMeme() {
    const meme = getMeme()
    const img = getImageById(meme.selectedImgId)
    if (!img) return

    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px Arial`
            gCtx.fillStyle = line.color
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'top'

            let y
            if (idx === 0) {
                y = 10
            } else if (idx === 1) {
                y = gElCanvas.height - line.size - 10
            } else {
                y = gElCanvas.height / 2 - (line.size * (meme.lines.length - 2)) / 2 + (idx - 2) * line.size
            }

            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            line.x = gElCanvas.width / 2 - textWidth / 2
            line.y = y
            line.width = textWidth
            line.height = textHeight

            gCtx.fillText(line.txt, gElCanvas.width / 2, y)

            if (idx === meme.selectedLineIdx) {
                gCtx.strokeStyle = '#FFFAFA'
                gCtx.lineWidth = 2
                gCtx.strokeRect(line.x - 5, y - 5, textWidth + 10, textHeight + 10)
            }
        })
    }
}

function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        if (
            offsetX >= line.x && 
            offsetX <= line.x + line.width &&
            offsetY >= line.y &&
            offsetY <= line.y + line.height
        ) {
            meme.selectedLineIdx = idx;
            updateTextInput()
            renderMeme()
        }
    })
}

function onTextChange() {
    const newText = document.querySelector('.meme-text-input').value
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    selectedLine.txt = newText
    renderMeme()
}

function onImgSelect(elImg) {
    setImg(elImg)
    onSwitchView()
    renderMeme()
}

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

function onSwitchLine() {
    console.log('switching lines')
    switchLine()
}

function onSwitchView() {

    var elGalleryContainer = document.querySelector('.gallery')
    var elEditorContainer = document.querySelector('.editor')
    
    elGalleryContainer.classList.toggle('hidden')
    elEditorContainer.classList.toggle('hidden')

}