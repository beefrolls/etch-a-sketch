const container = document.querySelector('.grid-container');
const sizeBtn = document.querySelector('#size');
const sizeList = document.querySelector('.size-list');
const sizes = document.querySelectorAll('li button')
const color = document.querySelector('#color');
const fillColor = document.querySelector('#fill-color');
const eraser = document.querySelector('#erase');
const clearGrid = document.querySelector('#clear');
const rgbBtn = document.querySelector('.misc button:nth-child(1)');
const gridLines = document.querySelector('.misc button:nth-child(2)');
const defGridCount = 24;
const defGridSize = defGridCount * defGridCount;
let isDrawing = false;

/* Default color values */
fillColor.value = '#FFFFFF';
color.value = '#000000';

console.log(defGridCount)

container.style.setProperty('--blocksize', defGridCount)
for (i = 0; i < defGridSize; i++){
    const defDiv = document.createElement('div');
    container.appendChild(defDiv);
}

const blocks = document.querySelectorAll('.grid-container div');

blocks.forEach((block) => {
    block.style.backgroundColor = 'white' /*default color value*/
    block.addEventListener('mousedown', function(e) {
        startDraw(e);
        startErase(e);
    });
    block.addEventListener('mouseup', function() {
        stopDraw();
        stopErase();
    });
    block.addEventListener('mousemove', function(e) {
        drawing(e);
        erasing(e);
    });
    fillColor.addEventListener('change', function() {
        block.style.backgroundColor = fillColor.value
    })
})


sizeBtn.addEventListener('click', function() {
    if (sizeList.style.display == 'none') {
        sizeList.style.display = 'block'
    } else {
        sizeList.style.display = 'none'
    }
})

sizes.forEach((size) => {
    size.addEventListener('click', function() {
        sizeList.style.display = 'none';
        container.innerHTML = '';
        const sizeLabel = size.textContent;
        const sizeLabelStr = sizeLabel.slice(0,2);
        const sizeValue = parseInt(sizeLabelStr);
        const gridWidth = sizeValue **2
        container.style.setProperty('--blocksize', sizeValue)
        for (i = 0; i < gridWidth; i++) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('block')
            container.appendChild(newDiv)  
        }
        const newBlocks = document.querySelectorAll('div .block');
        newBlocks.forEach((newBlock) => {
            newBlock.addEventListener('mousedown', function(e) {
                startDraw(e);
                startErase(e);
            });
            newBlock.addEventListener('mouseup', function() {
                stopDraw();
                stopErase();
            });
            newBlock.addEventListener('mousemove', function(e) {
                drawing(e);
                erasing(e);
            });
            fillColor.addEventListener('change', function(){
                newBlock.style.backgroundColor = fillColor.value
            })
        })
    })
})

let isErasing = false;
let eraseBtn = false;
eraser.addEventListener('click', erase);

clearGrid.addEventListener('click', function() {
    const blocks = document.querySelectorAll('.grid-container *')
    blocks.forEach((block) => {
        block.style.backgroundColor = 'white'
    })
})

container.addEventListener('mouseleave', function(e) {
    stopDraw();
    stopErase();
})

rgbBtn.addEventListener('click', rgbActive)

let lines = true;
gridLines.addEventListener('click', function() {
    if (lines == true) {
        lines = !lines;
        gridLines.textContent = 'Add lines'
        gridLines.style.backgroundColor = 'black';
        gridLines.style.color = 'white';
        gridLines.style.borderColor = 'white';
        container.style.backgroundColor = 'white';
        container.style.gridGap = '0px';
    } else {
        lines = !lines;
        gridLines.textContent = 'Remove lines'
        gridLines.style.backgroundColor = 'white';
        gridLines.style.color = 'black';
        gridLines.style.borderColor = 'black';
        container.style.backgroundColor = 'black'
        container.style.gridGap = '1px';
    }
})

function startDraw(e) {
    isDrawing = true;
    e.target.style.backgroundColor = color.value
    e.preventDefault()

}


let rgbMode = false;
let hue = 0;

function drawing(e) {
    if (isDrawing == true && rgbMode == true) {
        e.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
        hue = Math.floor(Math.random() * 361) 
    } else if (isDrawing == true) {
        e.target.style.backgroundColor = color.value;
    }
    e.preventDefault()
}


function stopDraw() {
    isDrawing = false;
}

function erase() {
    if (eraseBtn == false) {
        eraseBtn = !eraseBtn;
        eraser.style.backgroundColor = 'black';
        eraser.style.color = 'white';
        eraser.style.borderColor = 'white';
    } else {
        eraseBtn = !eraseBtn;
        eraser.style.backgroundColor = 'white';
        eraser.style.color = 'black';
        eraser.style.borderColor = 'black';
    }
}

function stopErase() {
    isErasing = false;
} 

function startErase(e) {
    isErasing = true
    if (isErasing == true && eraseBtn == true) {
        e.target.style.backgroundColor = 'white';
    } 
}

function erasing(e) {
    if (isErasing == true && eraseBtn == true) {
        e.target.style.backgroundColor = 'white';
    } 
}

function rgbActive() {
    if (rgbMode == false) {
        rgbMode = !rgbMode;
        rgbBtn.textContent = 'Color Mode'
        rgbBtn.style.backgroundColor = 'black';
        rgbBtn.style.color = 'white';
        rgbBtn.style.borderColor = 'white';
    } else {
        rgbMode = !rgbMode;
        rgbBtn.textContent = 'RGB Mode';
        rgbBtn.style.backgroundColor = 'white';
        rgbBtn.style.color = 'black';
        rgbBtn.style.borderColor = 'black';
    }
}
