const titleElem = document.querySelector(".sketchpad-title");
const ctaElem = document.querySelector(".user-input-cta");
const sketchpadElem = document.querySelector(".sketchpad");
const styleElem = document.createElement("style");

runApp();

function runApp() {
  colorizeTitle();

  ctaElem.addEventListener("click", () => {
    const numBoxes = getUserInput();
    generateBoxes(numBoxes);
  });
}

function generateBoxes(numBoxes) {
  // Handle cancellation
  if (numBoxes === null) {
    console.log("User cancelled input.");
    return;
  }

  // Reset sketchpad and fill it with boxes
  sketchpadElem.innerHTML = "";
  let boxElemString = "";
  for (let i = 1; i <= numBoxes ** 2; i++) {
    boxElemString += `<div class="box"></div>`;
  }
  sketchpadElem.innerHTML = boxElemString;

  // Style boxes
  const boxElems = document.querySelectorAll(".box");
  createCSSClass("box-size", `flex: 1 1 ${100 / numBoxes}%; height: ${100 / numBoxes}%;`);
  boxElems.forEach(boxElem => {
    // Set equal number of boxes on the x and y axis  
    boxElem.className += " box-size";
    // Set a random color on hover
    boxElem.addEventListener("mouseover", () => {
      boxElem.style.backgroundColor = generateRandomColor();
    });
  });
}

function getUserInput() {
  // Integers between 2 and 100 are allowed
  const isValidNumber = (number) => Number.isInteger(number) && number >= 2 && number <= 100;
  let userInput;

  do {
    userInput = prompt("Enter a number between 2 and 100 boxes:");

    // Exit if user cancels
    // Null return is handled by generateBoxes()
    if (userInput === null) { return null; }

    // Prompts return a string, so we convert it to a number
    userInput = parseInt(userInput, 10);
  } while (!isValidNumber(userInput));

  return userInput;
}

function colorizeTitle() {
  const titleText = titleElem.textContent;

  titleElem.innerHTML = "";
  for (let i = 0; i < titleText.length; i++) {
    const spanElem = document.createElement("span");
    spanElem.textContent = titleText[i];
    spanElem.style.color = generateRandomColor();
    titleElem.appendChild(spanElem);
  }
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}

function createCSSClass(className, styles) {
  styleElem.textContent = `
    .${className} {
      ${styles}
    }
  `;
  document.head.appendChild(styleElem);
}