// Objectives
// This is follows the three state game layout
// Start -> Play -> Reset
// Is there a good model for this? -> Can this be an article?
var rulesContainer = document.querySelector('.rules-container');
var guessContainer = document.querySelector('.guess-container');
var inputContainer = document.querySelector('.input-container');
///////////////////////////////////////////////////
// Method for Changing States
///////////////////////////////////////////////////
var play = function () {
    // setup board and prepare for play state
    var playButton = createButton('Play');
    // TODO
    rulesContainer.innerHTML = rules;
    playButton.addEventListener('click', function () { setupGame(); });
    inputContainer.appendChild(playButton);
};
var gameOver = function () {
    inputContainer.innerHTML = '';
    var playAgainButton = createButton('Play Again');
    inputContainer.appendChild(playAgainButton);
    // track play state and transition to game over
};
// May remove this and just call play?
var resetGame = function () {
    // reset the board => return to preplay
    inputContainer.innerHTML = '';
    var playButton = createButton('Play');
    inputContainer.appendChild(playButton);
};
// Setup and Teardown functions
var setupGame = function () {
    // remove rules and play button
    rulesContainer.innerHTML = "";
    inputContainer.innerHTML = "";
    // add input -> Can I get a cool expand transition?
    createGuessInputElements();
    // initialize state
};
// Create Game Element
var createGuessInputElements = function () {
    inputContainer.innerHTML = "";
    var letterInputLabel = createLabel('Guess Letter');
    var letterInputField = createInput();
    var submitButton = createButton('Guess');
    var inputElements = [letterInputLabel, letterInputField, submitButton];
    for (var _i = 0, inputElements_1 = inputElements; _i < inputElements_1.length; _i++) {
        var el = inputElements_1[_i];
        inputContainer.appendChild(el);
    }
};
// Input Elements
var createLabel = function (text) {
    var newLabel = document.createElement('label');
    newLabel.classList.add('guess-label');
    newLabel.innerText = text;
    return newLabel;
};
var createInput = function () {
    var newInput = document.createElement('input');
    newInput.classList.add('guess-input');
    newInput.type = 'text';
    return newInput;
};
var createButton = function (text) {
    var gameButton = document.createElement('button');
    gameButton.classList.add('guess-button');
    gameButton.textContent = text;
    return gameButton;
};
var rules = "<b>Rules: </b> I will pick a random letter from A-Z and you will take turns guessing what it is. Everytime you guess incorrectly I will tell you HIGH or LOW. Don't worry, I'll let you know when you win...";
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
