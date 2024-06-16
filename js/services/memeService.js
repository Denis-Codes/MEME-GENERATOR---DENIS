'use strict'

var gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['trump', 'person'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'meme-imgs/meme-imgs (square)/3.jpg', keywords: ['cute', 'baby'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'serious'] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['person', 'funny'] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['person', 'wonka'] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['obama', 'person'] },
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['boxer', 'funny'] },
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['person', 'funny'] },
    { id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['person', 'leonardo'] },
    { id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['matrix', 'serious'] },
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['lord', 'funny'] },
    { id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['startrek', 'funny'] },
    { id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['putin', 'person'] },
    { id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['funny', 'buzz'] },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Line',
            size: 50,
            color: 'white',
            x: 0,
            y: 50,
            width: 0,
            height: 0,
            font: 'Impact'
        }
    ],
    stickers: ['💦','❌','😎','💯','🔥','❤️','🙌🏻','🤫']
}

var gUploadedImg = null

var gKeywordSearchCountMap = { 'funny': 0, 'cat': 0, 'baby': 0 }

var gMemeText = ['Coding got me like', 'When you find a bug in the code']

function getMeme() {
    return gMeme
}

function getImageById(id) {
    return gImgs.find(img => img.id === id)
}

function setImg(elImg) {
    const selectedImgId = +elImg.dataset.imgId
    gMeme.selectedImgId = selectedImgId
    gUploadedImg = null
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text
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
        txt: 'New Line',
        size: 50,
        color: 'white',
        x: 0,
        y: gMeme.lines.length === 0 ? 50 : gElCanvas.height - 50,
        font: 'Impact'
    }
    
    gMeme.lines.push(newLine)
    updateTextInput()
    renderMeme()
}

function updateTextInput() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    const elTextInput = document.querySelector('.meme-text-input')
    if (selectedLine) {
        elTextInput.value = selectedLine.txt
    } else {
        elTextInput.value = ''
    }
}

function renderText() {
    const meme = getMeme()
    meme.lines.forEach(line => {
        gCtx.lineWidth = '2'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Impact`
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        gCtx.fillText(line.txt, gElCanvas.width / 2, line.y)
        gCtx.strokeText(line.txt, gElCanvas.width / 2, line.y)
    })
}

function switchLine() {

    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length

    updateTextInput()

    document.querySelector('.meme-text-input').focus()

    renderMeme()
}

function moveLine(dir) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (dir === 'up') line.y -= 5
    if (dir === 'down') line.y += 5
    renderMeme()
}

function deleteLine() {
    const meme = getMeme()

    if (meme.lines.length === 0) return

    meme.lines.splice(meme.selectedLineIdx, 1)

    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = meme.lines.length - 1
    }

    if (meme.lines.length === 0) {
        document.querySelector('.meme-text-input').value = ''
    } else {
        updateTextInput()
    }

    renderMeme()
}

function alignText(align) {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    const textWidth = gCtx.measureText(selectedLine.txt).width


    switch (align) {
        case 'left':
            selectedLine.x = 10
            break
        case 'center':
            selectedLine.x = gElCanvas.width / 2 - textWidth / 2
            break
        case 'right':
            selectedLine.x = gElCanvas.width - textWidth - 10
            break
        default:
            return
    }
    renderMeme()
}

function addEventListeners() {
    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)
}

//FACEBOOK

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

//UPLOAD IMG

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(elImg) {
    // Draw the img on the canvas
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gUploadedImg = elImg
    renderText()
}




