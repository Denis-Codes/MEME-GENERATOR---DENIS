'use strict'

var gElCanvas
var gCtx
var gFilterBy = ''
var isDragging = false
var startX, startY

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gMeme.selectedImgId = gImgs[13].id
    renderMeme()
    renderGallery()
    populateDatalist()
    updateTextInput()
    addEventListeners()
}

function renderMeme() {
    const meme = getMeme()

    const drawImageAndText = () => {
        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font || 'Impact'}`
            gCtx.fillStyle = line.color || 'white'
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.textBaseline = 'top'

            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            if (line.x === null) {
                line.x = gElCanvas.width / 2 - textWidth / 2
            }
            line.width = textWidth
            line.height = textHeight

            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)

            if (idx === meme.selectedLineIdx) {
                gCtx.strokeStyle = '#FFFAFA'
                gCtx.lineWidth = 2
                gCtx.strokeRect(
                    line.x - 7,
                    line.y - 5,
                    textWidth + 14,
                    textHeight + 10
                )
            }
        })
    }

    const img = getImageById(meme.selectedImgId)
    if (!img) return

    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawImageAndText()
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
            meme.selectedLineIdx = idx
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

function onSetFilterBy(elInput) {
    gFilterBy = elInput.value.toLowerCase()
    renderGallery()
}

function onResetFilter() {
    const elInput = document.querySelector('.filter-text')
    elInput.value = ''
    gFilterBy = ''
    renderGallery()
}

function populateDatalist() {
    const datalist = document.getElementById('keywords-list')
    const keywords = new Set()

    gImgs.forEach(img => {
        img.keywords.forEach(keyword => keywords.add(keyword))
    })

    const options = Array.from(keywords).map(keyword => `<option value="${keyword}">`).join('')
    datalist.innerHTML = options
}

function onMouseDown(ev) {
    const { offsetX, offsetY } = ev
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    if (
        offsetX >= selectedLine.x &&
        offsetX <= selectedLine.x + selectedLine.width &&
        offsetY >= selectedLine.y &&
        offsetY <= selectedLine.y + selectedLine.height
    ) {
        isDragging = true
        startX = offsetX
        startY = offsetY
    }
}

function onMouseMove(ev) {
    if (!isDragging) return

    const { offsetX, offsetY } = ev
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    const dx = offsetX - startX
    const dy = offsetY - startY

    selectedLine.x += dx
    selectedLine.y += dy

    startX = offsetX
    startY = offsetY

    renderMeme()
}

function onMouseUp() {
    isDragging = false
}