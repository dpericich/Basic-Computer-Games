// Objectives
// This is follows the three state game layout
// Start -> Play -> Reset
// Is there a good model for this? -> Can this be an article?
const rulesContainer: HTMLDivElement = document.querySelector('.rules-container');
const guessContainer: HTMLDivElement = document.querySelector('.guess-container');
const inputContainer: HTMLDivElement = document.querySelector('.input-container');

///////////////////////////////////////////////////
// Method for Changing States
///////////////////////////////////////////////////


const play = (): void => {
  inputContainer.innerHTML = '';
  const playButton = createButton('Play');
  playButton.addEventListener('click', () => { setupGame() })
  inputContainer.appendChild(playButton)
  rulesContainer.innerHTML = rules;
  guessContainer.innerHTML = '';
  // reset game state
}

const gameOver = (): void => {
  inputContainer.innerHTML = '';
  const playAgainButton: HTMLButtonElement = createButton('Play Again');
  playAgainButton.addEventListener('click', () => play())
  inputContainer.appendChild(playAgainButton);
}

// May remove this and just call play?
const resetGame = (): void => {
  // reset the board => return to preplay
  inputContainer.innerHTML = '';
  const playButton: HTMLButtonElement = createButton('Play');
  inputContainer.appendChild(playButton);

}

// Setup and Teardown functions

const setupGame = (): void => {
  // remove rules and play button
  rulesContainer.innerHTML = ""
  inputContainer.innerHTML = ""
  // add input -> Can I get a cool expand transition?
  createGuessInputElements();
  // initialize state
}




// Create Game Element
const createGuessInputElements = (): void => {
  inputContainer.innerHTML = "";
  const letterInputLabel: HTMLLabelElement = createLabel('Guess Letter');
  const letterInputField: HTMLInputElement = createInput();
  const submitButton: HTMLButtonElement = createButton('Guess');

  const inputElements: (HTMLLabelElement | HTMLInputElement | HTMLButtonElement)[] = [letterInputLabel, letterInputField, submitButton];

  for (let el of inputElements) {
    inputContainer.appendChild(el)
  }
}

// Input Elements
const createLabel = (text: string): HTMLLabelElement    => {
  const newLabel = document.createElement('label');
  newLabel.classList.add('guess-label')
  newLabel.innerText = text;
  return newLabel
}

const createInput = (): HTMLInputElement => {
  const newInput = document.createElement('input')
  newInput.classList.add('guess-input');
  newInput.type = 'text';
  return newInput;
}

const createButton = (text: string): HTMLButtonElement => {
  const gameButton: HTMLButtonElement = document.createElement('button');
  gameButton.classList.add('guess-button')
  gameButton.textContent = text;
  return gameButton;
}

const rules: string = `<b>Rules: </b> I will pick a random letter from A-Z and you will take turns guessing what it is. Everytime you guess incorrectly I will tell you HIGH or LOW. Don't worry, I'll let you know when you win...`

// What is this pattern?
// I have three states
// 1) Preplay instruction state
// 2) Play state
// 3) Game Over / Reset state

// Use play() as a way to prepare the instructions and add the ability to proceed to the play
// the function name should point to the next state of the game not the current state


// How do I structure different functions and code in a single script game?


// Start the game
play();
