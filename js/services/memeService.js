'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat falafel',
            size: 20,
            color: 'white',
            y: 50
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 0, 'cat': 0, 'baby': 0 }


function getMeme() {
    return gMeme
}

function getImageById(id) {
    return gImgs.find(img => img.id === id)
}

function setImg(elImg) {
    const selectedImgId = +elImg.dataset.imgId
    gMeme.selectedImgId = selectedImgId
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
}

function setBottomLineTxt(text) {
    const meme = getMeme()
    if (meme.lines.length > 1) {
        meme.lines[1].txt = text 
    } else {
        const newLine = {
            txt: text,
            size: 20,
            color: 'white',
            y: gElCanvas.height - 50 
        }
        meme.lines.push(newLine)
    }
}
function textColor(event) {
    const color = event.target.value
    const meme = getMeme()
    meme.lines.forEach(line => {
        line.color = color
    })
    renderMeme()
}

function changeFontSize(diff) {
    const meme = getMeme()
    meme.lines.forEach(line => {
        line.size += diff
    })
    renderMeme()
}

function addLine() {
    var newLine = {
        txt: 'I like shawarma better',
        size: 20,
        color: 'white',
        y: gMeme.lines.length === 0 ? 50 : gElCanvas.height - 50 
    }
    gMeme.lines.push(newLine)
    renderMeme() 
}

function renderText() {
    const meme = getMeme()
    meme.lines.forEach(line => {
        gCtx.lineWidth = '2'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial` 
        gCtx.textAlign = 'center' 
        gCtx.textBaseline = 'middle' 
        gCtx.fillText(line.txt, gElCanvas.width / 2, line.y)
        gCtx.strokeText(line.txt, gElCanvas.width / 2, line.y)
    })
}

