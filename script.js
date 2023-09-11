let slider = document.getElementById("grid");
let gridValue = slider.value;
let gridContainer = document.getElementById("container");
let allBoxes = document.getElementsByClassName("grid-box");



//Current color
let currentColor = "black"; //default
let currentBackgroundColor = "white" //default




//Startup
createGrid();
changeBoxColor();


function createGrid() {
    for(let i = 0; i < gridValue*gridValue; i++) {
        let div = document.createElement("div");
        div.className = "grid-box";
        div.style.width = `${600/gridValue - 1}px`;
        div.style.height = `${600/gridValue - 1}px`;

        gridContainer.appendChild(div);
    }
}

function removeGrid() {
    //Convert the HTMLCollection to an array for easier iteration
    let boxesArray = Array.from(allBoxes);

    //Loop through the elements and remove them
    boxesArray.forEach(function(box) {
        box.remove();
    });
}





//Slider
let grid_size_display = document.getElementById("grid-size");
grid_size_display.textContent = `${gridValue} x ${gridValue}`;
slider.addEventListener("input", function() {
    gridValue = slider.value;
    grid_size_display.textContent = `${gridValue} x ${gridValue}`;
    removeGrid()
    createGrid();
    if(randomEnabled && isEraserToggled) {
        changeBoxColor();
        applyRandomColors();
        applyEraser();
    } else if (randomEnabled) {
        changeBoxColor();
        applyRandomColors();
    } else if (isEraserToggled) {
        changeBoxColor();
        applyEraser();
    } else {
        changeBoxColor();
    }
})





//Hovering and changing colors of box
let hovered = false;
function changeBoxColor() {
    let boxesArray = Array.from(allBoxes);

    boxesArray.forEach(function (box) {
        box.addEventListener("mousedown", function () {
            box.style.backgroundColor = currentColor;
            hovered = true;
        });

        box.addEventListener("mouseover", () => {
            if (hovered) {
                box.style.backgroundColor = currentColor;
            }
        });

        box.addEventListener("mouseup", () => {
            hovered = false;
        });
    });
}





//Select pen color
let pen = document.getElementById("pen");

pen.addEventListener("input", () => {
    currentColor = pen.value;
})





//Select background color
let background = document.getElementById("background");
gridContainer.style.backgroundColor = currentBackgroundColor;

background.addEventListener("input", () => {
    let backgroundColorValue = background.value;
    gridContainer.style.backgroundColor = backgroundColorValue;
})





//Extra: random colors
const randomColorsButton = document.getElementById("random");
let randomEnabled = false;
let tempCurrentColor = currentColor;

randomColorsButton.addEventListener("click", () => {
    randomEnabled = !randomEnabled;
    randomColorsButton.classList.toggle('toggled', randomEnabled);
    if (randomEnabled) {
        //When enabling random colors, store the current color
        tempCurrentColor = currentColor;
        applyRandomColors();
    } else {
        randomColorsButton.classList.remove('toggled');
        currentColor = tempCurrentColor; //Restore the previous color
        removeRandomColoring();
    }
});

function applyRandomColors() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.addEventListener('mousedown', setRandomColor);
        div.addEventListener('mouseover', setRandomColor);
    });
}

function setRandomColor() {
    currentColor = getRandomColor();
}

function removeRandomColoring() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.removeEventListener('mousedown', setRandomColor);
        div.removeEventListener('mouseover', setRandomColor);
    });
}

function getRandomColor() {
    // Generate a random color in hex format (#RRGGBB)
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}





//Clear grid of all colours
const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", resetColors);

function resetColors() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.style.backgroundColor = ''; // Reset to default background color
    });
}




//Darken and lighten buttons
const darkenButton = document.getElementById("darken");
const lightenButton = document.getElementById("lighten");
let isDarkenToggled = false;
let isLightenToggled = false;

darkenButton.addEventListener("click", () => {
    if (!isDarkenToggled) {
        isDarkenToggled = true;

        if(isLightenToggled) {
            isLightenToggled = false;
            lightenButton.classList.remove("toggled");
            removeLightenListeners();
        }

        addDarkenListeners();
    } else {
        isDarkenToggled = false;
        removeDarkenListeners(); //Remove click listeners for darkening when toggled off
    }
    darkenButton.classList.toggle("toggled", isDarkenToggled);
});

lightenButton.addEventListener("click", () => {
    if (!isLightenToggled) {
        isLightenToggled = true;

        if(isDarkenToggled) {
            isDarkenToggled = false;
            darkenButton.classList.remove("toggled");
            removeDarkenListeners();
        }

        addLightenListeners();
    } else {
        isLightenToggled = false;
        removeLightenListeners(); //Remove click listeners for lightening when toggled off
    }
    lightenButton.classList.toggle("toggled", isLightenToggled);
});

function addDarkenListeners() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.addEventListener("click", darkenSquare);
    });
}

function removeDarkenListeners() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.removeEventListener("click", darkenSquare);
    });
}

function addLightenListeners() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.addEventListener("click", lightenSquare);
    });
}

function removeLightenListeners() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.removeEventListener("click", lightenSquare);
    });
}

function darkenSquare() {
    const boxColor = getComputedStyle(this).backgroundColor;
    console.log(boxColor)
    const rgbArray = boxColor.match(/\d+/g);
    
    // Calculate 10% of black to add to each color channel
    const increaseBy = Math.floor(25.5); // 10% of 255
    const newColor = `rgb(${rgbArray[0] - increaseBy}, ${rgbArray[1] - increaseBy}, ${rgbArray[2] - increaseBy})`;
    
    this.style.backgroundColor = newColor;
}

function lightenSquare() {
    let boxColor = getComputedStyle(this).backgroundColor;
    boxColor = boxColor.substring(4, boxColor.length - 1).replace(/ /g, '').split(',');
    let r = parseInt(boxColor[0]);
    let g = parseInt(boxColor[1]);
    let b = parseInt(boxColor[2]);

    // Calculate the increase in each color channel to achieve 10% lighter color
    let increaseBy = Math.floor(0.1 * (255 - r));

    // Calculate the new color
    r = Math.min(r + increaseBy, 255);
    g = Math.min(g + increaseBy, 255);
    b = Math.min(b + increaseBy, 255);

    this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}




//Eraser
const eraserButton = document.getElementById("eraser");
let isEraserToggled = false;
let eraserHovered = false;

eraserButton.addEventListener("click", () => {
    isEraserToggled = !isEraserToggled;
    if (isEraserToggled) {
        eraserButton.classList.toggle("toggled", isEraserToggled);
        applyEraser()
    } else {
        eraserButton.classList.toggle("toggled", isEraserToggled);
        removeEraser();
    }
})

function applyEraser() {
    let boxesArray = Array.from(allBoxes);

    boxesArray.forEach((div) => {
        div.addEventListener("mousedown", eraseBackground);
        div.addEventListener("mouseover", eraseBackgroundOnHover);
        div.addEventListener("mouseup", stopErasing);
    });
}

function eraseBackground() {
    this.style.removeProperty("background-color");
    eraserHovered = true;
}

function eraseBackgroundOnHover() {
    if (eraserHovered) {
        this.style.removeProperty("background-color");
    }
}

function stopErasing() {
    eraserHovered = false;
}

function removeEraser() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.removeEventListener("mousedown", eraseBackground);
        div.removeEventListener("mouseover", eraseBackgroundOnHover);
        div.removeEventListener("mouseup", stopErasing);
    });
}
