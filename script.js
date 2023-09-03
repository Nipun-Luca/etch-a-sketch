let slider = document.getElementById("grid");
let gridValue = slider.value;
let gridContainer = document.getElementById("container");
let allBoxes = document.getElementsByClassName("grid-box");

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
    boxesArray.forEach(function(allBoxes) {
        allBoxes.remove();
    });
}


slider.addEventListener("input", function() {
    gridValue = slider.value;
    removeGrid()
    createGrid();
    changeBoxColor();
})


//Hovering and changing colors of box
function changeBoxColor(){
    let boxesArray = Array.from(allBoxes);

    boxesArray.forEach(function(box) {
        box.addEventListener("mouseover", function() {
            box.classList.add("grid-box-hovered");
        });
    });
}