const guessedLetters: HTMLElement = document.querySelector('.guessed-letters');
const imageContainer: HTMLElement = document.querySelector('.image-container');
const stageImage: HTMLImageElement = document.querySelector('.stage-image');
const inputContainer: HTMLElement = document.querySelector('.input-container');
const letterSpaces: HTMLElement = document.querySelector('.letter-spaces');
const buttonContainer: HTMLElement = document.querySelector('.btn-container');

let correctLetters: string[] = []
let letters: string[] = []
let incorrectLetters: string[] = []
let currentStage: number = 0;

// Here are the Words to Use!
const words: string[] = [
  "apple", "orange", "pencil", "dog", "zebra", "automobile", "beer", "brother", "bus", "game", "cat", "parrot",
  "ears", "feet", "sandwich", "carrot", "cucumber", "pear", "map", "state", "bear", "tiger", "monkey", "key",
  "shirt", "pants", "dryer", "car", "bus", "elephant"
]

const setUpGame = (): void => {
  const playBtn: HTMLButtonElement = document.querySelector('.play')
  buttonContainer.removeChild(playBtn);
  buildGuessedLetters('_____');
  const word = getRandomWord(words);
  generateWordSpots(word);
  addInputDisplay();
}

const resetGame = (): void => {
  guessedLetters.innerHTML = '';
  incorrectLetters = [];
  letterSpaces.innerHTML = '';
  letters = [];
  buttonContainer.innerHTML = '';
  currentStage = 0;
  setImageStage(currentStage);
  inputContainer.innerHTML = '';
  play();
}

const buildGuessedLetters = (spaces: string): void => {
  const guesses: string[] = spaces.split('');
  incorrectLetters = [...guesses]

  incorrectLetters.forEach(letter => {
    const guess: HTMLElement = document.createElement('p');
    guess.classList.add('guessed-letter');
    guess.innerText = letter;
    guessedLetters.appendChild(guess);
  })
}

const updateGuessedLetters = (): void => {
  guessedLetters.innerText = incorrectLetters.join(' ');
}

const updateCorrectLetters = (): void => {
  letterSpaces.innerText = letters.join(' ');
}

const generateWordSpots = (word: string): void => {
  const wordLetters: string[] = word.split('');
  correctLetters = [...wordLetters]

  // TODO : Remove this console.log
  console.log(wordLetters);

  wordLetters.forEach(letter => {
    const correctLetter: HTMLElement = document.createElement('p');
    correctLetter.classList.add('correct-letter');
    correctLetter.innerText = '_';
    letterSpaces.appendChild(correctLetter);
  })
}

const addInputDisplay = (): void => {
  const inputLabel: HTMLLabelElement = createInputLabel();
  const letterInput: HTMLInputElement = createLetterInput();
  const guessButton: HTMLButtonElement = createLetterInputButton();

  guessButton.addEventListener('click', updateGame)

  const inputChildren: (HTMLLabelElement | HTMLInputElement | HTMLButtonElement)[] = [inputLabel, letterInput, guessButton];

  for (let el of inputChildren) {
    inputContainer.appendChild(el)
  }
}

const createImageElement = (stage: number): HTMLImageElement => {
  const hangmanImage: string = `./assets/stage${stage}.png`;
  const hangmanImageEl: HTMLImageElement = document.createElement('img');
  hangmanImageEl.classList.add('hangman-image');
  hangmanImageEl.src = hangmanImage;
  return hangmanImageEl;
}

const getRandomWord = (words: string[]): string => {
  const randomWordIdx = Math.floor(Math.random() * words.length);
  return words[randomWordIdx];
}

// Element Builder Methods
const buildPlayButton = (text: string): HTMLButtonElement  => {
  const playBtn = document.createElement('button');
  playBtn.classList.add('play');
  playBtn.tabIndex = 0;
  playBtn.innerText = text;
  return playBtn;
}

const createInputLabel = (): HTMLLabelElement => {
  const inputLabel: HTMLLabelElement = document.createElement('label');
  inputLabel.classList.add('input-label');
  inputLabel.htmlFor = 'letter';
  inputLabel.innerText = 'Enter Letter:'
  return inputLabel;
}

const createLetterInput = (): HTMLInputElement => {
  const input: HTMLInputElement = document.createElement('input');
  input.classList.add('letter-input');
  input.type = 'text';
  input.name = 'letter';
  return input;
}

const createLetterInputButton = (): HTMLButtonElement => {
  const button: HTMLButtonElement = document.createElement('button');
  button.classList.add('guess-btn');
  button.innerText = 'Guess';
  return button;
}

const setImageStage = (stage: number): void => {
  stageImage.src = `assets/stage${stage}.png`;
}

const updateGame = (): void => {
  // 1) retrieve the value from the input
  const inputField: HTMLInputElement = document.querySelector('.letter-input');
  const inputValue = inputField.value;
  // 2) check for invalid input
  if (validateLetterInput(inputValue)) {
    const cleanGuess = cleanInput(inputValue);
    console.log(cleanGuess);
    // 1) Then update correct letters
    const correctIndexes = checkCorrectLetters(cleanGuess);

    if (correctIndexes.length > 0) {
      updateCorrectLettersCollection(correctIndexes, cleanGuess);
    } else {
      // 2) Update incorrect letters
      updateIncorrectLetters(cleanGuess);
      // update the image
      setImageStage(currentStage)
    }
  } else {
    alert('Sorry, that\'s not a valid guess.');
  }
  // 3) handle input
  if (letters.length == correctLetters.length) {
    alert('You Win!')
    gameOver();
  }

  if (currentStage == 6) {
    alert('You Lost...')
    gameOver();
  }
}

const validateLetterInput = (input: string): boolean => {
  // refactor to return more information on why the guess failed?
  // TODO : Figure out includes alt
  // const isCorrectFormat = (input.length == 1) && !(Number(`${input}`) && !incorrectLetters.join('').includes(input))
  const isCorrectFormat = (input.length == 1) && !(Number(`${input}`))
  return isCorrectFormat;
}

const cleanInput = (input: string): string => {
  input.toLowerCase();
  return input;
}

const checkCorrectLetters = (letter: string): number[] => {
  const correctIndexes: number[] = [];
  console.log('I was hit!')
  console.log(letters);

  correctLetters.forEach((currentLetter, idx) => {
    console.log('These are the values')
    console.log(currentLetter, idx)
    if (currentLetter == letter) { correctIndexes.push(idx) }
  })

  console.log(correctIndexes);

  return correctIndexes;
}

const updateCorrectLettersCollection = (letterIdx: number[], correctLetter: string): void => {
  for (let correctIdx of letterIdx) {
    letters[correctIdx] = correctLetter;
  }

  updateCorrectLetters()
}

const updateIncorrectLetters = (incorrectLetter: string): void  => {
  incorrectLetters[currentStage] = incorrectLetter;
  updateGuessedLetters();
  currentStage++;
}

// Stage 1 -> Load
const play = (): void => {
  const playBtn: HTMLButtonElement = buildPlayButton('Play');
  buttonContainer.appendChild(playBtn);
  playBtn.addEventListener('click', () => setUpGame())
}

// Stage 2 -> Play
// this is handled by updateGame() for running the game loop

// Stage 3 -> Game Complete
const gameOver = (): void => {
  const playAgainButton: HTMLButtonElement = buildPlayButton('Play Again');
  buttonContainer.appendChild(playAgainButton);
  playAgainButton.addEventListener('click', () => resetGame())
  inputContainer.innerHTML = '';
}

play();
