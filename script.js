// DOM elements
const cta = document.querySelector(".user-input-cta");
const sketchpad = document.querySelector(".sketchpad");
const titleElement = document.querySelector(".sketchpad-title");

runApp();

function runApp() {
  colorizeTitle();
  cta.addEventListener("click", () => {
    const userInput = getUserInput();

    generateBoxes(userInput);
  });
}

function getUserInput() {
  // Integers between 2 and 100 are allowed
  const isValidNumber = (number) => Number.isInteger(number) && number >= 2 && number <= 100;

  let userInput;
  do {
    userInput = prompt("Enter a number between 2 and 100 boxes:");
    // User cancels prompt
    if (userInput === null) { return null; }
    // Convert prompt string to a number
    userInput = parseInt(userInput, 10);
  } while (!isValidNumber(userInput));

  return userInput;
}

function generateBoxes(userInput) {
  // Handle cancellation
  if (userInput === null) {
    console.log("User canceled input.");
    return;
  }

  // Reset sketchpad
  sketchpad.innerHTML = "";
  let boxDivs = "";

  for (let i = 1; i <= userInput ** 2; i++) {
    boxDivs += `<div class="box"></div>`;
  }

  sketchpad.innerHTML = boxDivs;

  const boxes = document.querySelectorAll(".box");

  boxes.forEach(box => {
    // Set box dimensions to an equal percentage based on number of boxes
    box.style.cssText = `flex: 1 1 ${100 / userInput}%; height: ${100 / userInput}%;`;
    // Change color on mouseover
    box.addEventListener("mouseover", () => {
      box.style.backgroundColor = generateRandomColor();
    });
  });
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function colorizeTitle() {
  // Break the textContent into individual characters wrapped in spans
  const titleText = titleElement.textContent;
  titleElement.innerHTML = '';

  for (let i = 0; i < titleText.length; i++) {
    const span = document.createElement('span');
    span.textContent = titleText[i];
    span.style.color = generateRandomColor();
    titleElement.appendChild(span);
  }
}