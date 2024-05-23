let shipIndexes = [];
let numberOfShipsFound = 0;
let attemptsLeft = 8;
let indexesOfClickedGrid = [];

const createGrid = () => {
  shipIndexes = getUniqueRandomNumbers(5, 16);
  console.log(shipIndexes);
  insertShipAndWaterImages(shipIndexes);
};

const showImageAndHandleResult = (event) => {
  gridCell = event.target;
  clickedGridIndex = Number(gridCell.id);
  if (indexesOfClickedGrid.includes(clickedGridIndex)) return;

  indexesOfClickedGrid.push(clickedGridIndex);
  attemptsLeft--;

//image hiding
  imageElement = gridCell.firstElementChild;
  imageElement.classList.remove("hide-image");
//____________________________________________

  setTimeout(() => {
    handleResult(clickedGridIndex);
  }, 0);
}

const handleResult = (gridIndex) => {

  if (shipIndexes.includes(gridIndex)){
    numberOfShipsFound++;
  }
  if (numberOfShipsFound === 5){
    alert("You won the game!!");
    resetGame();
  } else if (attemptsLeft === 0){
    alert("You lost the game.");
    resetGame();
  }
};

const getUniqueRandomNumbers = (quantity, max) => {
  const uniqueRanNum = []; //random numbers
    while(uniqueRanNum.length < quantity){
      const number = Math.floor(Math.random() * max) + 1
      if(uniqueRanNum.indexOf(number) === -1) uniqueRanNum.push(number);
    }
  return uniqueRanNum;
};

const insertShipAndWaterImages = (shipIndexes) => {
  for (let i=1; i<=16; i++){
    gridCell = document.getElementById(i); //parent element
    imageElement = document.createElement("img");
    gridCell.appendChild(imageElement);  //child element
    shipIndexes.includes(i) ? imageElement.src = "ship.png" : imageElement.src = "water.png";
    imageElement.classList.add("hide-image");
  }
};

const removePreviousImages = () => {
  for (let i=1; i<=16; i++){
    gridCell = document.getElementById(i);
    gridCell.innerHTML = "";
  }
};

const resetGame = () => {
  shipIndexes = [];
  numberOfShipsFound = 0;
  attemptsLeft = 8;
  indexesOfClickedGrid = [];

  removePreviousImages();
  createGrid();
}

createGrid();

document.getElementById("game-grid").addEventListener("click", (e) => showImageAndHandleResult(e))