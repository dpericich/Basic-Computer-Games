const cards = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"]
const suits = ["clubs", "diamonds", "hearts", "spades"]

const determineCardValue = (idx) => {
  return (idx % 13 == 0) ? 13 : idx % 13;
}

// This should be an object and contain methods to shuffle and draw cards
const createDeck = () => {
  let deck = [];
  let idx = 1;

  for (suit of suits) {
    for (card of cards) {
      deck.push({ suit: suit, card: card, value: determineCardValue(idx), drawn: false, idx });
      idx++;
    }
  }

  return deck;
}

class Deck {
  initialize(a, b) {
    this.a = a
    this.b = b
  }

  printHello() {
    console.log('Hello!')
  }
}

let deck1 = new Deck('apple', 'banana');

console.log(deck1)
console.log(deck1.printHello())
console.log(deck1.a)
console.log(deck1.b)

let myDeck = createDeck();

// Draw card from deck by
console.log(myDeck[Math.ceil(Math.random() * 52)])

// Need to
// 1) Shuffle the deck to allow us to randomly assign the range of
// 2) Draw a Card
