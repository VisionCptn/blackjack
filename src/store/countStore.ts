import { reactive } from 'vue';
import { generateShoe, shuffle } from '../cards';
import type { Card, CountState } from '../types';
import { getFromStorage } from '../helper';
import { sleep } from '../helper';
import { Sounds, playSound } from '../sound'

const NUMBER_OF_DECKS = 1

export const countState = reactive<CountState>({
  shoe: [] as Card[],
  cardsPlayed: 0,
  dealtCards: [] as Card[],
  isDealing: false,
  showTitleScreen: true,
  countDeckCount: getFromStorage('countDeckCount',1),
  dealSpeed: getFromStorage('dealSpeed',0),
  hiddenCard: {} as Card,
  result: false,
  isAllCardsDealt: false,
  currentCount: 0,
  countdown: 3,
  showCountdown: false,
})

export function reshuffleShoe() {
  countState.shoe = shuffle(generateShoe(NUMBER_OF_DECKS))
  countState.cardsPlayed = 0
  countState.dealtCards = []
}

export function dealCard() {
  // if (countState.shoe.length === 0) reshuffleShoe()
  const card = countState.shoe.pop()
  if (card) {
    countState.dealtCards.push(card)
    countState.cardsPlayed++
    countState.currentCount += cardValues[card.rank]; // Assuming card has a value property
  } else {
    countState.isAllCardsDealt = true;
  }
}

export function resetCountPractice() {
  reshuffleShoe()
}

export async function startDealing() {
  countState.hiddenCard = countState.shoe.pop() || { rank: 'A', suit: '♠', index: 0 };
  if (countState.dealSpeed !== 0) {
    await dealAllCards(countState.dealSpeed);
    countState.isAllCardsDealt = true;
  }
  
  // countState.hiddenCard = 
}

export async function dealAllCards(delay = 1000) {
  console.log('Dealing all cards with delay:', delay);
  delay = Number((delay / 52 * 1000).toFixed())
  // console.log(delay * 1000);
  while (countState.shoe.length > 0) {
    dealCard()
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

const cardValues = {
  '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
  '7': 0, '8': 0, '9': 0,
  '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1
};

export async function resetState() {
  countState.cardsPlayed = 0;
  countState.dealtCards = [];
  countState.isDealing = false;
  countState.result = false;
  countState.hiddenCard = {} as Card;
  countState.shoe = []; // Reset the shoe to prevent continued dealing
  countState.isAllCardsDealt = false;
  countState.currentCount = 0;
}

export async function startCountdown() {
  countState.shoe = generateShoe(countState.countDeckCount);
  if (countState.dealSpeed !== 0) {
    countState.showCountdown = true;
    countState.countdown = 3;
    const timer = setInterval(() => {
      if (countState.countdown > 1) {
        countState.countdown--;
      } else if (countState.countdown === 1) {
        countState.countdown = 0;
      } else {
        countState.showCountdown = false;
        startDealing();
        clearInterval(timer);
      }
    }, 1500);
  } else {
  //   countState.showCountdown = false;
    startDealing();
  }
}

export async function checkHiLoResult(num: number) {
  
  // const cardValue = cardValues[countState.hiddenCard.rank];
  // countState.result = countState.currentCount === num ? 'win' : 'lose';
  if (countState.currentCount === num) {
    countState.result = 'correct';
    playSound(Sounds.Win);
  } else {
    playSound(Sounds.Lose);
    countState.result = 'wrong';
  }
  await sleep(3000);
  await resetState();
  countState.showTitleScreen = true;
}
