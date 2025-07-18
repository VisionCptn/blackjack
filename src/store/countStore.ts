import { reactive } from 'vue'
import { generateShoe, shuffle } from '../cards'
import type { Card } from '../types'

const NUMBER_OF_DECKS = 1

export const countState = reactive({
  shoe: generateShoe(NUMBER_OF_DECKS),
  cardsPlayed: 0,
  dealtCards: [] as Card[],
  isDealing: false,
  showTitleScreen: true,
})

export function reshuffleShoe() {
  countState.shoe = shuffle(generateShoe(NUMBER_OF_DECKS))
  countState.cardsPlayed = 0
  countState.dealtCards = []
}

export function dealCard() {
  if (countState.shoe.length === 0) reshuffleShoe()
  const card = countState.shoe.shift()
  if (card) {
    countState.dealtCards.push(card)
    countState.cardsPlayed++
  }
  return card
}

export function resetCountPractice() {
  reshuffleShoe()
}

export async function dealAllCards(delay = 288) {
  while (countState.shoe.length > 0) {
    dealCard()
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}


