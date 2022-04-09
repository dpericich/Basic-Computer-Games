const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

async function input(prompt) {
  console.log(prompt);
  return (await readline[Symbol.asyncIterator]().next()).value;
}

async function main() {
  let continueGame = true;
  const name = await input("What is your name? ");
  let deck = new Deck();
  deck.createDeck();
  deck.shuffleDeck();

  while(continueGame === true) {
    keepPlaying = await input("Would you like to keep playing? (Y/n) ");
    if (keepPlaying.toLowerCase() == 'n') break;


    checkDeck(deck);
    let currentHand = sortHand(deck.drawCards(2));
    textDivides();
    displayCards(currentHand);
    textDivides();

    bet = await input("Would you like to play this hand? (Y/n) ");
    if (bet.toLowerCase() == 'n') continue;

    let flipCard = deck.drawCards(1);
    textDivides();
    displayFlipCard(flipCard)
    textDivides();

    checkFlipCard(currentHand, flipCard, name);
  }

  readline.close();
}

class Deck {
  constructor() {
    this.idx = 1,
    this.deck = [],
    this.cards = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"],
    this.suits = ["clubs", "diamonds", "hearts", "spades"]
  }


  createDeck() {
    let idx = this.idx;
    this.deck = [];

    const determineCardValue = (idx) => {
      return (idx % 13 == 0) ? 13 : idx % 13;
    }

    for (let suit of this.suits) {
      for (let card of this.cards) {
        this.deck.push({ suit: suit, card: card, value: determineCardValue(idx) });
        idx++;
      }
    }
  }

  shuffleDeck() {
    let cardSortMoves = 250;

    for (let i = 0; i < cardSortMoves; i++) {
      let idxOfCardToMove = Math.floor(Math.random() * 52)
      let cardToMove = this.deck.splice(idxOfCardToMove, 1)
      this.deck.push(cardToMove[0]);
    }
  }

  drawCards(n) {
    let cards = [];
    for (let i = 0; i < n; i++) {
      cards.push(this.deck.pop())
    }

    return cards;
  }
}

const checkDeck = (deck) => {
  if (deck.deck.length < 3) {
    console.log('I have run out of cards...')
    console.log('Shuffling quickly, please wait!')
    deck.createDeck();
    deck.shuffleDeck();
  }
}

const sortHand = (hand) => {
  let sortedHand = [];

  if (hand[0].value > hand[1].value) {
    sortedHand.push(hand[1]);
    sortedHand.push(hand[0])
  } else {
    sortedHand.push(hand[0])
    sortedHand.push(hand[1])
  };

  return sortedHand;
}

const displayCards = (hand) => {
  console.log(`Your first card is a ${hand[0].card} of ${hand[0].suit}.`);
  console.log(`Your second card is a ${hand[1].card} of ${hand[1].suit}.`)
}

const displayFlipCard = (flipCard) => {
  console.log(`Your flip card is a ${flipCard[0].card} of ${flipCard[0].suit}.`)
}

const checkFlipCard = (currentHand, flipCard, name) => {
  let middleValue = flipCard[0].value;
  let currentHandValues = currentHand.map(card => card.value);

  if ( currentHandValues[0] < middleValue && middleValue < currentHandValues[1]) {
    console.log(`${name}, you won!`)
  } else {
    console.log(`${name}, better luck next time...`)
    textDivides();
  }
}

main();

// Helper methods
const textDivides = () => {
  console.log('//////////////////////////////////////////////');
}
