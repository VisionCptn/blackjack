import { CardSuits, CardValue } from './cards'

export type CardSuit = (typeof CardSuits)[number]
export type CardRank = keyof typeof CardValue
export type HandResult = 'win' | 'lose' | 'push' | 'blackjack' | 'bust'

export type Card = {
  rank: CardRank
  suit: CardSuit
  index: number
}

export type Player = {
  name?: string
  isDealer: boolean
  bank: number
  /** The player's hands (A player can have two hands after splitting) */
  hands: Hand[]
}

export type CoinBet = {
  value: number
  color: string

}

export type GameState = {
  /** The shoe of cards */
  shoe: Card[]
  /** Number of cards played */
  cardsPlayed: number
  /** The players in the game, including the dealer */
  players: Player[]
  /** The player whose turn it is */
  activePlayer: Player | null
  /** The hand that is currently being played */
  activeHand: Hand | null
  /** Whether the dealer is dealing cards (preventing interaction) */
  isDealing: boolean
  /** Whether the dealer's hole card is face up */
  showDealerHoleCard: boolean
  /** Whether the game is over due to bankruptcy */
  isGameOver: boolean
  /** The download progress of the sound files */
  soundLoadProgress: number
  /// The current bet amount for the active hand
  currentBet: number
  // 
  currentBetCoins: CoinBet[]
  // prevent double betting
  isBetPlaced: boolean
  // should auto place previous bet
  autoPlaceBet: boolean
  // size of shoe (number of decks)
  shoeSize: number
  /** Whether insurance is offered */
  isInsuranceOffered: boolean
  /** The insurance bet amount */
  insuranceBet: number,
  /** setting modal property flag for insurance option */
  allowInsurance: boolean,
  /** display double down coins */
  isDoubleDown: boolean,
  /** record value prop */
  record: number,
}

export type CountState = {
  shoe: Card[]
  cardsPlayed: number
  dealtCards: Card[]
  isDealing: boolean
  showTitleScreen: boolean
  countDeckCount: number
  dealSpeed: number
  hiddenCard: Card
  result: boolean | 'correct' | 'wrong'
  isAllCardsDealt: boolean
  currentCount: number
  countdown: number
  showCountdown: boolean
}

export type BasicState = {
  /** The shoe of cards */
  shoe: Card[]
  /** Number of cards played */
  cardsPlayed: number
  /** The players in the game, including the dealer */
  players: Player[]
  /** The player whose turn it is */
  activePlayer: Player | null
  /** The hand that is currently being played */
  activeHand: Hand | null
  /** Whether the dealer is dealing cards (preventing interaction) */
  isDealing: boolean
  /** Whether the dealer's hole card is face up */
  showDealerHoleCard: boolean
  /** Whether the game is over due to bankruptcy */
  isGameOver: boolean
  /** The download progress of the sound files */
  soundLoadProgress: number
  /// The current bet amount for the active hand
  currentBet: number
  // 
  currentBetCoins: CoinBet[]
  // prevent double betting
  isBetPlaced: boolean
  // should auto place previous bet
  autoPlaceBet: boolean
  // size of shoe (number of decks)
  shoeSize: number
  /** Whether insurance is offered */
  isInsuranceOffered: boolean
  /** The insurance bet amount */
  insuranceBet: number,
  /** setting modal property flag for insurance option */
  allowInsurance: boolean,
  /** display double down coins */
  isDoubleDown: boolean,
  /** record value prop */
  record: number,
  showDealBtn: boolean,
  autoDeal: boolean,
  rounds: number,
}



export class Hand {
  id: number
  cards: Card[]
  bet: number
  result?: 'win' | 'lose' | 'push' | 'bust' | 'blackjack' | 'shuffle'

  constructor(bet = 0) {
    this.id = new Date().getTime() + Math.random()
    this.cards = []
    this.bet = bet
  }

  get total(): number {
    let total = 0
    let addedHighAce = false
    for (const card of this.cards) {
      total += CardValue[card.rank as CardRank]
      if (card.rank === 'A' && !addedHighAce) {
        total += 10
        addedHighAce = true
      }
    }
    if (total > 21 && addedHighAce) total -= 10
    return total
  }

  get isBust(): boolean {
    return this.total > 21
  }

  get isBlackjack(): boolean {
    return this.total === 21 && this.cards.length === 2
  }

  reset() {
    this.cards = []
    this.bet = 0
    this.result = undefined
  }
}
