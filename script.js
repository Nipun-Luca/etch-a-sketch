let slider = document.getElementById("grid");
let gridValue = slider.value;
let gridContainer = document.getElementById("container");
let allBoxes = document.getElementsByClassName("grid-box");

//Current color
let currentColor = "black"; //default


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
    if(randomEnabled) {
        applyRandomColors();
    } else {
        changeBoxColor();
    }
})


//Hovering and changing colors of box
function changeBoxColor(){
    let boxesArray = Array.from(allBoxes);

    boxesArray.forEach(function(box) {
        box.addEventListener("mouseover", function() {
            box.style.backgroundColor = currentColor;
        });
    });
}


//Button
const buttons = document.querySelectorAll('.option');
let isToggled = false;

buttons.forEach(element => {
    element.addEventListener('click', () => {
        isToggled = !isToggled;
        element.classList.toggle('toggled', isToggled);
    });
});


/*Extra: random colors*/
let randomColorsButton = document.getElementById("random");
let randomEnabled = false;

randomColorsButton.addEventListener("click", () => {
    randomEnabled = !randomEnabled;
    if (randomEnabled) {
        applyRandomColors();
    } else {
        randomEnabled = false;
        changeBoxColor();
    }
});

function applyRandomColors() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        // Generate a random color and apply it as the background color
        const randomColor = getRandomColor();
        div.addEventListener('mouseover', () => {
            div.style.backgroundColor = randomColor;
        });
    });
}

function getRandomColor() {
    // Generate a random color in hex format (#RRGGBB)
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}



//Clear grid of all colours
let clearButton = document.getElementById("clear");

clearButton.addEventListener("click", resetColors);

function resetColors() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.style.backgroundColor = ''; // Reset to default background color
    });
}