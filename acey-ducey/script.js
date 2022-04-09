// This file handles the logic for the classic card game Acey Ducey
// The rules of this game (the basic rules) are that a dealer will
// flip two cards in view of the bettor. The bettor will then bet
// or pass based on if they believe the next card dealt will be
// within the dealt cards

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

// https://nodejs.dev/learn/how-to-use-the-nodejs-repl

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// TODO: Need to figure out how to have a continous readline in the background for quitting
// probably not continous, just have a method that checks at each user input for a 'q'
// there are inflection points for quitting

// What is the sequence for this game?
// Print rules
// ask for name
// initialize the Game object

// this is the loop
// ask if the player wants to play
// get 2 cards from the deck
// display numbers to the player
// ask the player if they think the next card will be between the two
// get the number a player wants to bet
// get a card and check if it's in the range
// based on the result update the player's money
// ask to play again



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

function initializeGame(){
  const name = askForName();
  const game = new Game(name);
}

introScreen();
displayRules();
initializeGame();


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

function askForName() {
  readline.question(`What is your name? `, answer => {
    console.log(answer)
    readline.close();
  })
}

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

// Initialization consists of:
// get user's name
// set user's balance

// Every round consists of:
// Call Deck.get_cards(); -> should get the high and low values as well as the third card
// Print out the low and high card
//

// The game stores the name, balance, deck of cards and hand
// The deck of cards creates a deck of cards, draws the two then one cards and keeps track of which cards have been drawn
// The hand keeps track of the low and high cards as well as the thrid card

// Maybe have a game object that keeps track of the
// Have a deck class that creates an object that tracks what is
// happening for each card

class Deck {
  // A Deck should:
  // 1) create a deck of 52 cards
  // 2) be able to shuffle the 52 cards
  // 3) find and return an array of hashes where the first element is lower than the second
  // 4) draw a third card
  constructor() {
    cards: {}
  }

  getDeck() {
    let cards = {};

  }

  // What does a card consist of?
  // {idx: { 'suit', 'type, 'numberValue } }


  shuffle(){
    // this will reset the 'drawn' value for all cards to
  }

  deal(){
    // this will draw 2 random cards and mark them as used
  }
}
class Hand {
  constructor(twoCards, thirdCard) {
    this.lowCard = twoCards[0];
    this.highCard = twoCards[1];
    this.thirdCard = thirdCard;
  }
}
class Game {
  constructor(name="Player 1") {
    this.name = name;
    this.balance = 100;
    this.handsPlayed = 0;
    this.wins = 95;
    this.loses = 0;
    this.deck = new Deck();
    this.currentHand = new Hand();
  }

  trackHandsPlayed() {
    this.handsPlayed++;
  }

  addWin(){
    this.wins++;
  }

  addLoss(){
    this.loss++;
  }

  updateBalance(amount){
    this.balance += amount
  }

  getTwoCards() {
    return this.deck.getTwoCards();
  }
}
