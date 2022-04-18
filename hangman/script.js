var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var guessedLetters = document.querySelector('.guessed-letters');
var imageContainer = document.querySelector('.image-container');
var stageImage = document.querySelector('.stage-image');
var inputContainer = document.querySelector('.input-container');
var letterSpaces = document.querySelector('.letter-spaces');
var buttonContainer = document.querySelector('.btn-container');
var correctLetters = [];
var letters = [];
var incorrectLetters = [];
var currentStage = 0;
// Here are the Words to Use!
var words = [
    "apple", "orange", "pencil", "dog", "zebra", "automobile", "beer", "brother", "bus", "game", "cat", "parrot",
    "ears", "feet", "sandwich", "carrot", "cucumber", "pear", "map", "state", "bear", "tiger", "monkey", "key",
    "shirt", "pants", "dryer", "car", "bus", "elephant"
];
var setUpGame = function () {
    var playBtn = document.querySelector('.play');
    buttonContainer.removeChild(playBtn);
    buildGuessedLetters('_____');
    var word = getRandomWord(words);
    generateWordSpots(word);
    addInputDisplay();
};
var resetGame = function () {
    guessedLetters.innerHTML = '';
    incorrectLetters = [];
    letterSpaces.innerHTML = '';
    letters = [];
    buttonContainer.innerHTML = '';
    currentStage = 0;
    setImageStage(currentStage);
    inputContainer.innerHTML = '';
    play();
};
var buildGuessedLetters = function (spaces) {
    var guesses = spaces.split('');
    incorrectLetters = __spreadArray([], guesses, true);
    incorrectLetters.forEach(function (letter) {
        var guess = document.createElement('p');
        guess.classList.add('guessed-letter');
        guess.innerText = letter;
        guessedLetters.appendChild(guess);
    });
};
var updateGuessedLetters = function () {
    guessedLetters.innerText = incorrectLetters.join('');
};
var generateWordSpots = function (word) {
    var wordLetters = word.split('');
    correctLetters = __spreadArray([], wordLetters, true);
    // TODO : Remove this console.log
    console.log(wordLetters);
    wordLetters.forEach(function (letter) {
        var correctLetter = document.createElement('p');
        correctLetter.classList.add('correct-letter');
        correctLetter.innerText = '_';
        letterSpaces.appendChild(correctLetter);
    });
};
var addInputDisplay = function () {
    var inputLabel = createInputLabel();
    var letterInput = createLetterInput();
    var guessButton = createLetterInputButton();
    guessButton.addEventListener('click', updateGame);
    var inputChildren = [inputLabel, letterInput, guessButton];
    for (var _i = 0, inputChildren_1 = inputChildren; _i < inputChildren_1.length; _i++) {
        var el = inputChildren_1[_i];
        inputContainer.appendChild(el);
    }
};
var createImageElement = function (stage) {
    var hangmanImage = "./assets/stage".concat(stage, ".png");
    var hangmanImageEl = document.createElement('img');
    hangmanImageEl.classList.add('hangman-image');
    hangmanImageEl.src = hangmanImage;
    return hangmanImageEl;
};
var getRandomWord = function (words) {
    var randomWordIdx = Math.floor(Math.random() * words.length);
    return words[randomWordIdx];
};
// Element Builder Methods
var buildPlayButton = function (text) {
    var playBtn = document.createElement('button');
    playBtn.classList.add('play');
    playBtn.tabIndex = 0;
    playBtn.innerText = text;
    return playBtn;
};
var createInputLabel = function () {
    var inputLabel = document.createElement('label');
    inputLabel.classList.add('input-label');
    inputLabel.htmlFor = 'letter';
    inputLabel.innerText = 'Enter Letter:';
    return inputLabel;
};
var createLetterInput = function () {
    var input = document.createElement('input');
    input.classList.add('letter-input');
    input.type = 'text';
    input.name = 'letter';
    return input;
};
var createLetterInputButton = function () {
    var button = document.createElement('button');
    button.classList.add('guess-btn');
    button.innerText = 'Guess';
    return button;
};
var setImageStage = function (stage) {
    stageImage.src = "assets/stage".concat(stage, ".png");
};
var updateGame = function () {
    // 1) retrieve the value from the input
    var inputField = document.querySelector('.letter-input');
    var inputValue = inputField.value;
    // 2) check for invalid input
    if (validateLetterInput(inputValue)) {
        var cleanGuess = cleanInput(inputValue);
        // 1) Then update correct letters
        var correctIndexes = checkCorrectLetters(cleanGuess);
        if (correctIndexes.length > 0) {
            updateCorrectLetters(correctIndexes, cleanGuess);
        }
        else {
            // 2) Update incorrect letters
            updateIncorrectLetters(currentStage, cleanGuess);
            // update the image
            setImageStage(currentStage);
        }
    }
    else {
        alert('Sorry, that\'s not a valid guess.');
    }
    // 3) handle input
    // -> if correct input, determine if the letter is part of the word or not
    // -> => update correct letters if yes
    // -> => update incorrect letters and the image if no
    // -> => if incorrect prompt user that the input is incorrect
    if (currentStage == 6) {
        gameOver();
    }
};
var validateLetterInput = function (input) {
    // refactor to return more information on why the guess failed?
    // TODO : Figure out includes alt
    // const isCorrectFormat = (input.length == 1) && !(Number(`${input}`) && !incorrectLetters.join('').includes(input))
    var isCorrectFormat = (input.length == 1) && !(Number("".concat(input)));
    return isCorrectFormat;
};
var cleanInput = function (input) {
    input.toLowerCase();
    return input;
};
var checkCorrectLetters = function (letter) {
    var correctIndexes = [];
    console.log(letters);
    letters.forEach(function (currentLetter, idx) {
        if (currentLetter == letter) {
            correctIndexes.push(idx);
        }
    });
    console.log(correctIndexes);
    return correctIndexes;
    // check if the letter is contained within the word
    // if yes then find the indexes and update the display word
    // otherwise we want to update the score, add the letter to the incorrect guesses and change the image
};
var updateCorrectLetters = function (letterIdx, correctLetter) {
    for (var _i = 0, letterIdx_1 = letterIdx; _i < letterIdx_1.length; _i++) {
        var correctIdx = letterIdx_1[_i];
        letters[correctIdx] = correctLetter;
    }
};
var updateIncorrectLetters = function (currentStage, incorrectLetter) {
    console.log('I was hit!');
    incorrectLetters[currentStage] = incorrectLetter;
    console.log(incorrectLetter);
    updateGuessedLetters();
    currentStage++;
    console.log(currentStage);
};
// Stage 1 -> Load
var play = function () {
    var playBtn = buildPlayButton('Play');
    buttonContainer.appendChild(playBtn);
    playBtn.addEventListener('click', function () { return setUpGame(); });
};
// Stage 2 -> Play
// this is handled by updateGame() for running the game loop
// Stage 3 -> Game Complete
var gameOver = function () {
    var playAgainButton = buildPlayButton('Play Again');
    buttonContainer.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', function () { return resetGame(); });
    inputContainer.innerHTML = '';
};
play();
