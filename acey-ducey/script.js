// This file handles the logic for the classic card game Acey Ducey
// The rules of this game (the basic rules) are that a dealer will
// flip two cards in view of the bettor. The bettor will then bet
// or pass based on if they believe the next card dealt will be
// within the dealt cards

// https://nodejs.dev/learn/how-to-use-the-nodejs-repl

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// TODO: Need to figure out how to have a continous readline in the background for quitting
// probably not continous, just have a method that checks at each user input for a 'q'
// there are inflection points for quitting



function introScreen() {
  console.log('--------------------------------')
  console.log('---------- Acey Ducey ----------');
  console.log('-- Daniel Pericich Games 2022 --');
  console.log('--------------------------------')
}

function displayRules(){
  console.log('\n')
  console.log('--------------------------------');
  console.log('------------ RULES -------------');
  console.log('--------------------------------');
  console.log('Acey Ducey is a basic card game');
  console.log('that is played between a dealer');
  console.log('and a single player. The dealer');
  console.log('will deal 2 cards before');
  console.log('offering the bettor the option to');
  console.log('bet. The bettor will determine ');
  console.log('whether to bet or not based on if');
  console.log('they think that the card will be');
  console.log('between the two cards.')
  console.log('\n')
}

introScreen();
displayRules();
// Have an input of whether the user is ready to play (Y/n)

// take string inputs from the terminal


// Maybe have a game object that keeps track of the
// Have a deck class that creates an object that tracks what is
// happening for each card

class Deck {
  constructor() {
    cards: getCards();
  }

  shuffle(){
    // this will reset the 'drawn' value for all cards to
  }

  deal(){
    // this will draw 2 random cards and mark them as used
  }
}


// Practice with getting input from the user
// have a readline instance of 'readline'
// many methods, but we want to use question here which
// displays a question as the first arg, and then returns an output
// based on the input

// readline.question(`What's your name? `, name => {
//   console.log(`Hi ${name}!`)
//   readline.close()
// })

// for this game I will want to have the following inputs
// What is your name -> use this on every question and in the game text
// Do you want to hit -> yes or no for looking at input
// -> will need to have a helper method to clean the input
// -> also validate that the input is good

function askForMove() {
  readline.question(`Do you thing the third card will be in range? (Y/n) `, answer => {
    let formattedAnswer = formatAnswer(answer);
    console.log(formattedAnswer);
    readline.close();
  })
}

function formatAnswer(answer){
  const correctYesAnswers = ['yes', 'y'];
  const correctNoAnswers = ['no', 'n'];

  let lowerCaseAnswer = answer.toLowerCase();

  if (correctYesAnswers.includes(lowerCaseAnswer)) return 'yes';
  if (correctNoAnswers.includes(lowerCaseAnswer)) return 'no';
  return 'That is not a valid response';
}

askForMove();


// Every round consists of
