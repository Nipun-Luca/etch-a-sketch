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

// buttons.forEach(element => {
//     //Initialize isToggled property for each button
//     element.isToggled = false;

//     element.addEventListener('click', function() {
//         // Toggle the isToggled property for the clicked button
//         this.isToggled = !this.isToggled;
        
//         // Toggle the 'toggled' class based on the isToggled property
//         this.classList.toggle('toggled', this.isToggled);
//     });
// });


/*Extra: random colors*/
const randomColorsButton = document.getElementById("random");
let randomEnabled = false;

randomColorsButton.addEventListener("click", () => {
    randomEnabled = !randomEnabled;
    randomColorsButton.classList.toggle('toggled', this.isToggled);
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
        isLightenToggled = false;
        lightenButton.classList.remove("toggled");
        darkenSquare();
        // Additional logic for darken button here
    } else {
        isDarkenToggled = false;
        // Handle untoggle behavior if needed
    }
    darkenButton.classList.toggle("toggled", isDarkenToggled);
});

lightenButton.addEventListener("click", () => {
    if (!isLightenToggled) {
        isLightenToggled = true;
        isDarkenToggled = false;
        darkenButton.classList.remove("toggled");
        lightenSquare();
        // Additional logic for lighten button here
    } else {
        isLightenToggled = false;
        // Handle untoggle behavior if needed
    }
    lightenButton.classList.toggle("toggled", isLightenToggled);
});

function darkenSquare() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.addEventListener("click", () => {
            const currentColor = getComputedStyle(div).backgroundColor;
            const rgbArray = currentColor.match(/\d+/g);
            
            // Calculate 10% of black to add to each color channel
            const increaseBy = Math.floor(25.5); // 10% of 255
            const newColor = `rgb(${rgbArray[0] - increaseBy}, ${rgbArray[1] - increaseBy}, ${rgbArray[2] - increaseBy})`;
            
            div.style.backgroundColor = newColor;
        })
    });
}

function lightenSquare() {
    let boxesArray = Array.from(allBoxes);
    boxesArray.forEach((div) => {
        div.addEventListener("click", () => {
            const currentColor = getComputedStyle(div).backgroundColor;
            const rgbArray = currentColor.match(/\d+/g);
            
            // Calculate 10% of white to add to each color channel
            const decreaseBy = Math.floor(25.5); // 10% of 255
            const newColor = `rgb(${Math.min(rgbArray[0] + decreaseBy, 255)}, ${Math.min(rgbArray[1] + decreaseBy, 255)}, ${Math.min(rgbArray[2] + decreaseBy, 255)})`;
            
            div.style.backgroundColor = newColor;
        })
    });
}