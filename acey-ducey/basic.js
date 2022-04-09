const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { read } = require('fs');
const { exit } = require('process');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Basic Game Flow
function askForName() {
  readline.question(`What is your name? `, name => {
    console.log(`Hello, ${name}`);
    askToPlay();
    // readline.close();
  })
}

// Create Shuffled Deck

// Draw and display 2 cards

function askToPlay() {
  readline.question(`Would you like to play a game? Press (Y/n) `, resp => {
    let input = validateUserInput(resp, 'Y', 'n', 'q')
    if (input == true) {
      return
    } else {
      console.log(input);
      askToPlay();
    }

    // readline.close();
  })
}

async function input(prompt) {
  console.log(prompt);
  return (await readline[Symbol.asyncIterator]().next()).value;
}

async function main() {
  const name = await input("May I have your name? ");
  const color = await input("May I have your favorite color? ")

  console.log(name, color);
  readline.close();
}

main();

// Will wrap the game logic in a while loop within the main function

// Check card

// Ask to play again

// askToPlay();
// askForName();

// Helper Functions
const validateUserInput = (userValue, ...correctArgs)  => {
  if (correctArgs.includes(userValue)) {
    return true;
  } else {
    return 'I\m sorry, that\s not a valid option.'
  }
}
