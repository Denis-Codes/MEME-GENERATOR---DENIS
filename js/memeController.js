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
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    if (gUploadedImg) {
        gCtx.drawImage(gUploadedImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    } else {
        const img = getImageById(meme.selectedImgId)
        if (!img) return

        const elImg = new Image()
        elImg.src = img.url
        elImg.onload = () => {
            gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
            gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
            // renderText()

            meme.lines.forEach((line, idx) => {
                gCtx.font = `${line.size}px ${line.font || 'Impact'}`
                gCtx.fillStyle = line.color || 'white'
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 2
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
                gCtx.strokeText(line.txt, gElCanvas.width / 2, y)

                if (idx === meme.selectedLineIdx) {
                    gCtx.strokeStyle = '#FFFAFA'
                    gCtx.lineWidth = 2
                    gCtx.strokeRect(line.x - 5, y - 5, textWidth + 10, textHeight + 10)
                }
            })
        }
    }
}

function onRandomMeme() {
    const randomImgId = Math.floor(Math.random() * gImgs.length) + 1
    const randomTextIndex = Math.floor(Math.random() * gMemeText.length) 
    const randomTxt = gMemeText[randomTextIndex] 
    const meme = {
        selectedImgId: randomImgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: randomTxt,
                size: 25,
                color: 'white',
                x: null,
                y: 50,
                width: null,
                height: null,
                font: 'Impact'
            }
        ]
    }
    
    gMeme = meme
    onSwitchView()
    renderMeme()
    updateTextInput()
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

function onFontChange(font) {
    const meme = getMeme()
    if (meme.selectedLineIdx !== -1 && meme.lines[meme.selectedLineIdx]) {
        meme.lines[meme.selectedLineIdx].font = font
        renderMeme()
    }
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
    changeFontSize(5)
}

function onDecreaseFont() {
    changeFontSize(-5)
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
}

function onSwitchView() {
    var elGalleryContainer = document.querySelector('.gallery')
    var elEditorContainer = document.querySelector('.editor')
    var elViewBtn = document.querySelector('.view-switch-btn')

    elGalleryContainer.classList.toggle('hidden')
    elEditorContainer.classList.toggle('hidden')

    if (elEditorContainer.classList.contains('hidden')) {
        elViewBtn.innerText = 'Editor'
    } else {
        elViewBtn.innerText = 'Gallery'
    }
}