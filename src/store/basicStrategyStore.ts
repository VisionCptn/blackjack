import { shuffle } from '../cards'
import type { BasicState, HandResult, Player } from '../types'
import { computed, nextTick, reactive } from 'vue'
import { Sounds, playSound } from '../sound'
import { Hand } from '../types'
import { coins } from '../coins'
import { sleep, getFromStorage } from '../helper'

const MINIMUM_BET = 1
const STARTING_BANK = 1000
const NUMBER_OF_DECKS = 1
/** Reshuffle once less than 25% of the cards are left */
const SHUFFLE_THRESHOLD = 0.25
const INITIAL_PLAYERS: Player[] = [
  { isDealer: false, bank: STARTING_BANK, hands: [new Hand()] },
  { isDealer: true, bank: 0, hands: [new Hand()] },
]
const storageProps: string[] = ['isMuted', 'shoeSize', 'autoPlaceBet','allowInsurance']

// Basic Strategy Statistics
interface BasicStrategyStats {
  correctChoices: number
  wrongChoices: number
  totalChoices: number
  dealsPlayed: number
  lastMoveCorrect: boolean | null
  lastCorrectAction: string | null
  lastPlayerAction: string | null
}

export const basicStrategyStats = reactive<BasicStrategyStats>({
  correctChoices: 0,
  wrongChoices: 0,
  totalChoices: 0,
  dealsPlayed: 0,
  lastMoveCorrect: null,
  lastCorrectAction: null,
  lastPlayerAction: null,
})

export const state = reactive<BasicState>({
  shoe: [],
  cardsPlayed: 0,
  players: INITIAL_PLAYERS,
  activePlayer: null,
  activeHand: null,
  isDealing: true,
  showDealerHoleCard: false,
  isGameOver: true,
  isDoubleDown: false,
  autoPlaceBet: getFromStorage('autoPlaceBet', false),
  shoeSize: getFromStorage('shoeSize', 2),
  soundLoadProgress: 0,
  currentBet: 0,
  currentBetCoins: [],
  isBetPlaced: false,
  isInsuranceOffered: false,
  insuranceBet: 0,
  allowInsurance: getFromStorage('allowInsurance', false),
  record: getFromStorage('record', 1000),
  showDealBtn: true,
  autoDeal: getFromStorage('basic.autoDeal', false),
  rounds: getFromStorage('basic.rounds', 20),
})
export function setCustomTest () {

  state.shoe[0].rank = '8';
  state.shoe[1].rank = '8';
  state.shoe[2].rank = '8';
  state.shoe[3].rank = '4';
  state.shoe[4].rank = '2';
  state.shoe[5].rank = '2';
  state.shoe[6].rank = '2';
  state.shoe[7].rank = '2';
  state.shoe[8].rank = '2';
  state.shoe[9].rank = '2';
  state.shoe[10].rank = '2';
  state.shoe[11].rank = '2';
}
// state.shoe[12].rank = '2';
// state.shoe[13].rank = '2';
// state.shoe[14].rank = '2';
// state.shoe[15].rank = '2';
// state.shoe[16].rank = '2';
// state.shoe[17].rank = '2';
// state.shoe[18].rank = '2';
// state.shoe[19].rank = '2';
// state.shoe[20].rank = '2';
// console.log(state.shoe)
// Computed Properties

export const dealer = computed(() => {
  console.log('Dealer computed - players:', state.players)
  return state.players[state.players.length - 1]
})

const dealerHasBlackjack = computed(() => {
  return dealer.value.hands[0].isBlackjack
})

const userHasBlackjack = computed(() => {
  return state?.players[0].hands[0].isBlackjack
})

const dealerTotal = computed(() => dealer.value.hands[0].total)

const nextPlayer = computed(() => {
  if (!state.activePlayer || state.activePlayer === dealer.value) return null
  return state.players[state.players.indexOf(state.activePlayer) + 1]
})

export const canDoubleDown = computed(() => {
  if (state.isDealing) return false
  if ((state.activePlayer?.bank ?? 0) < (state.activeHand?.bet ?? 0)) return false
  return state.activeHand?.cards.length === 2 && state.activePlayer?.hands.length === 1
})

export const canSplit = computed(() => {
  if (state.isDealing) return false
  if ((state.activePlayer?.bank ?? 0) < (state.activeHand?.bet ?? 0)) return false
  return (
    state.activeHand?.cards.length === 2 &&
    state.activePlayer?.hands.length === 1 &&
    state.activeHand?.cards[0].rank === state.activeHand!.cards[1].rank
  )
})

export const canTakeInsurance = computed(() => {
  if (!state.isInsuranceOffered || !state.allowInsurance) return false
  if (state.insuranceBet > 0) return false
  if (state.activeHand?.cards.length !== 2 || state.activePlayer!.hands?.length !== 1) return false
  const maxInsurance = Math.floor((state.activeHand?.bet ?? 0) / 2)
  return (state.activePlayer?.bank ?? 0) >= maxInsurance && maxInsurance > 0
})

export const resetBank = () => {
  state.players.forEach((p) => (p.bank = STARTING_BANK))
}

// Functions

/** Play a round of blackjack.  Reset hands, reshuffle, place bets, deal cards, and play the first turn. */
export async function playRound() {
  if (checkForGameOver()) return
  state.showDealBtn = false; // Hide the deal button while dealing
  // Increment deals played for basic strategy tracking
  basicStrategyStats.dealsPlayed++
  
  // state.players.forEach((p) => (p.hands = [new Hand()]))
  state.showDealerHoleCard = false
  await placeBet(state.players[0], state.players[0].hands[0], state.currentBet || MINIMUM_BET)
  await dealRound()
  await checkForInsuranceOffer()
  if ((dealerHasBlackjack.value && state.allowInsurance === false) || (dealerHasBlackjack.value && userHasBlackjack.value)) return endRound()
  playTurn(state.players[0])
}

/** If the player is bankrupt, end the game. */
function checkForGameOver(): boolean {
  if (state.rounds <= basicStrategyStats.dealsPlayed) {
    clearState(true);
    return true
  }
  return false
}

/** Draw a card from the shoe. */
function drawCard() {
  // reshuffleIfNeeded()
  console.log('Shoe length:', state.shoe.length) // Should be 104 for 2 decks
    console.log('First card:', state.shoe[0])
  state.cardsPlayed++
  return state.shoe.shift()
}

/** Reshuffle the shoe if less than 25% of the cards are left. */
async function reshuffleIfNeeded() {

  const remainingPercentage = 1 - state.cardsPlayed / (NUMBER_OF_DECKS * 52)
  if (remainingPercentage > SHUFFLE_THRESHOLD) return

  playSound(Sounds.Shuffle)
  state.players[0].hands[0].result = 'shuffle'
  state.shoe = shuffle(state.shoe)
  state.cardsPlayed = 0
  await sleep()
}

/** Deal two cards to each player */
async function dealRound() {
  for (let i = 0; i < 2; i++) {
    for (const player of state.players) {
      player.hands[0].cards.push(drawCard()!)
      playSound(Sounds.Deal)
      await sleep(300)
    }
  }
}

/** Check if insurance should be offered (dealer shows an Ace). */
async function checkForInsuranceOffer() {
  const dealerUpCard = dealer.value.hands[0].cards[1]
  if (dealerUpCard && dealerUpCard.rank === 'A') {
    state.isInsuranceOffered = true
    state.activePlayer = state.players[0]
    state.activeHand = state.players[0].hands[0]
    await sleep(500)
  }
}

export function addBet(amount: number) {
  if (state.players[0].bank < amount ) {
    
    console.error('Insufficient funds to place bet');
    return;
  }

  state.currentBet += amount;
  state.players[0].bank -= amount;
  state.isBetPlaced = true; // Set the flag to indicate a bet has been placed
  const currentCoin = coins.find(coin => coin.value === amount);
  if (currentCoin) {
    state.currentBetCoins.push(currentCoin);
  } else {
    console.error('Coin not found for amount:', amount);
  }
  // Logic to place a bet
  // addBet(amount);
  state.showDealBtn = false;
  // showCoins.visible = false; // Hide the Coins component after placing the bet
}

/** Place a bet for the player. */
async function placeBet(player: Player, hand: Hand, amount: number) {
  state.isDealing = true
  // await nextTick()
  if (!state.isBetPlaced) {
    player.bank -= amount
  }
  hand.bet += amount
  playSound(Sounds.Bet)
  state.isBetPlaced = false;
  await sleep()
}

/** Start a player's turn by making them the active player and starting their first hand. */
function playTurn(player: Player) {
  state.activePlayer = player
  if (player.isDealer) return playDealerHand(player.hands[0])
  playHand(player.hands[0])
}

/** Set a hand as the active hand. End immediately if the player has blackjack. Deal additional cards to split hands. */
async function playHand(hand: Hand): Promise<void> {
  state.isDealing = true
  state.activeHand = hand
  if (await checkForBlackjack(hand)) return
  if (hand.cards.length === 1) {
    // Newly split hand
    await hit(false)
    if (hand.cards[0].rank === 'A') return endHand() // Player cannot hit after splitting aces
  }
  state.isDealing = false
}

/** Check if the player has blackjack. If so, award the player and end the hand. */
async function checkForBlackjack(hand: Hand): Promise<boolean> {
  if (hand.isBlackjack) {
    hand.result = 'blackjack'
    await sleep(100)
    playSound(Sounds.BlackjackBoom)
    await sleep(500)
    playSound(Sounds.Blackjack)
    await sleep(1200)
    hand.bet *= 3
    endHand()
    return true
  }
  return false
}

/** Play the dealer's hand. */
async function playDealerHand(hand: Hand) {
  state.isDealing = true
  state.activeHand = hand
  await revealDealerHoleCard()
  const allPlayersDone = state.players.every(
    (p) => p.isDealer || p.hands.every((h: Hand) => !!h.result),
  )
  if (allPlayersDone) return endRound()
  if (dealerTotal.value < 17) {
    await hit()
    if (!dealer.value.hands[0].result) return playDealerHand(hand)
  }
  endRound()
}

/** Deal one more card to the active hand, and check for 21 or a bust. */
export async function hit(isUserInput: boolean = true) {
  // Check basic strategy before making the move
  if (!state.activePlayer?.isDealer && isUserInput) {
    checkBasicStrategyMove('hit')
  }
  
  state.isDealing = true
  state.activeHand!.cards.push(drawCard()!)
  playSound(Sounds.Deal)
  if (await checkForTwentyOne(state.activeHand!)) return
  if (await checkForBust(state.activeHand!)) return
  await sleep()
  if (!state.activePlayer?.isDealer) state.isDealing = false
}

/** Check if the player has 21.  If so, end the hand. */
async function checkForTwentyOne(hand: Hand): Promise<boolean> {
  if (hand.total === 21) {
    if (!state.activePlayer?.isDealer) playSound(Sounds.GoodHit)
    await sleep()
    endHand()
    return true
  }
  return false
}

/** Check if the player has busted.  If so, end the hand. */
async function checkForBust(hand: Hand): Promise<boolean> {
  if (hand.isBust) {
    if (!state.activePlayer?.isDealer) playSound(Sounds.BadHit)
    await sleep()
    state.activeHand = null
    await sleep(300)
    hand.result = 'bust'
    if (!state.activePlayer?.isDealer) playSound(Sounds.Bust)
    endHand()
    return true
  }
  return false
}

/** Split the active hand into two hands, and restart the player's turn. */
export async function split(): Promise<void> {
  if (!canSplit.value) return
  
  // Check basic strategy for split move
  if (!state.activePlayer?.isDealer) {
    checkBasicStrategyMove('split')
  }
  
  state.isDealing = true
  const bet = state.activeHand!.bet
  const splitHands = [new Hand(bet), new Hand(0)]
  splitHands[0].cards = state.activeHand!.cards.slice(0, 1)
  splitHands[1].cards = state.activeHand!.cards.slice(1)
  state.activeHand = null
  await sleep()
  state.activePlayer!.hands = splitHands
  await placeBet(state.activePlayer!, state.activePlayer!.hands[1], bet)
  playTurn(state.activePlayer!)
}

/** Double the bet for the active hand, and hit only once. */
export async function doubleDown(): Promise<void> {
  if (!canDoubleDown.value) return
  
  // Check basic strategy for double down move
  if (!state.activePlayer?.isDealer) {
    checkBasicStrategyMove('doubleDown')
  }
  
  state.isDoubleDown = true;
  await placeBet(state.activePlayer!, state.activeHand!, state.activeHand!.bet)
  await hit(false)
  endHand()
}

/** Take insurance bet when dealer shows an Ace. */
export async function takeInsurance(): Promise<void> {
  if (!canTakeInsurance.value) return
  const maxInsurance = Math.floor((state.activeHand?.bet ?? 0) / 2)
  state.insuranceBet = maxInsurance
  state.activePlayer!.bank -= maxInsurance
  playSound(Sounds.Bet)
  await sleep(300)
}

/** Advance to the next hand or player. */
export async function endHand(userInput = false) {
  // Check basic strategy for stand move
  if (!state.activePlayer?.isDealer && userInput) {
    checkBasicStrategyMove('stand')
  }
  
  const isSplit = state.activePlayer && state.activePlayer.hands.length > 1
  if (isSplit && state.activePlayer?.hands[1].cards.length === 1) {
    return playHand(state.activePlayer?.hands[1])
  }
  if (nextPlayer.value) playTurn(nextPlayer.value)
}

export async function clearState(showTitleScreen = false) {
  // Immediately stop any ongoing dealing process
  state.isDealing = true; // Set to true to stop any ongoing operations
  state.activeHand = null;
  state.activePlayer = null;
  
  await sleep(100); // Short delay to allow any ongoing operations to stop
  
  // Force reset all hands immediately
  for (const player of state.players) {
    for (const hand of player.hands) {
      hand.reset(); // Clear cards and reset hand state
    }
    player.hands = [new Hand()]; // Ensure fresh hands
  }
  
  // Handle winnings/bank adjustments
  for (const player of state.players) {
    if (player.isDealer) continue
    let total = 0;
    // Add insurance winnings if any
    if (state.insuranceBet > 0) {
      total += state.insuranceBet * 3; // Original bet + 2:1 payout
      state.insuranceBet = 0
    }
    
    player.bank += total
  }
  
  // Reset all game state
  state.isDoubleDown = false;
  state.showDealerHoleCard = false;
  if (state.currentBet > 0) {
    state.currentBet = 0;
  }
  state.currentBetCoins = [];
  state.showDealBtn = true;
  state.isBetPlaced = false;
  state.isInsuranceOffered = false;
  state.insuranceBet = 0;
  if (showTitleScreen) {
    state.isGameOver = true;
  }

  resetBasicStrategyStats();

}

/** Determine any remaining results, settle bets, collect winnings, and reset hands before starting a new round. */
export async function endRound() {
  state.isDealing = true
  if (!state.showDealerHoleCard) await revealDealerHoleCard()
  if (dealerHasBlackjack.value) playSound(Sounds.DealerBlackjack)
  state.activeHand = null
  state.activePlayer = null
  await determineResults()
  await settleBets()
  await collectWinnings()
  await reshuffleIfNeeded()
  await resetHands()
  await redoBet()
  // await saveStateToStorage()
  basicStrategyStats.lastMoveCorrect = null
  basicStrategyStats.lastCorrectAction = null
  basicStrategyStats.lastPlayerAction = null
  if (state.autoDeal) {
    playRound(); // Automatically start a new round if auto deal is enabled;
  } else {
    state.showDealBtn = true; // Show the deal button after the round ends
  }
  
  // Clear basic strategy feedback after round is completely finished
}

/** Reveal the dealer's hole card. */
async function revealDealerHoleCard() {
  if (state.showDealerHoleCard) return
  await sleep()
  playSound(Sounds.Deal)
  state.showDealerHoleCard = true
  await sleep()
}

/** Determine the result for each hand (e.g. win, lose, push, blackjack, bust). */
async function determineResults() {
  for (const player of state.players) {
    if (player.isDealer) continue
    for (const hand of player.hands) {
      if (hand.result) continue
      if (dealerTotal.value > 21) hand.result = 'win'
      else if (dealerTotal.value === hand.total) hand.result = 'push'
      else if (dealerTotal.value < hand.total) hand.result = 'win'
      else hand.result = 'lose'
      playSoundForResult(hand.result)
      await sleep()
    }
  }
}

/** Play a sound for the result of a hand. */
function playSoundForResult(result: HandResult) {
  if (result === 'win') {
    playSound(Sounds.Win)
  } else if (result === 'push') {
    playSound(Sounds.Push)
  } else if (!dealerHasBlackjack.value) {
    playSound(Sounds.Lose)
  }
}

/** Add each hand's winnings to the hand's bet amount (so it can be collected later).*/
async function settleBets() {
  let total = 0
  
  // Handle insurance bet
  if (state.insuranceBet > 0) {
    if (dealerHasBlackjack.value) {
      // Insurance pays 2:1
      total += state.insuranceBet * 3 // Original bet + 2:1 payout
    } else {
      // Insurance loses
      state.insuranceBet = 0
    }
    await sleep(300)
  }
  
  for (const player of state.players) {
    if (player.isDealer) continue
    for (const hand of player.hands) {
      // Blackjack is paid out immediately, so it is not handled here
      if (hand.result === 'win') hand.bet *= 2
      if (['lose', 'bust'].includes(hand.result!)) hand.bet = 0
      total += hand.bet
    }
  }
  playSound(total > 1 ? Sounds.ChipUp : Sounds.ChipDown)
  await sleep()
}

/** Collect the total winnings (from each hand's bet) and add it to the player's bank. */
async function collectWinnings() {
  for (const player of state.players) {
    if (player.isDealer) continue
    let total = 0;
    // Add insurance winnings if any
    if (state.insuranceBet > 0) {
      total += state.insuranceBet * 3; // Original bet + 2:1 payout
      state.insuranceBet = 0
    } else {
      total = player.hands.reduce((acc: number, hand: Hand) => acc + hand.bet, 0)
    }
    
    player.bank += total
    if (total > 0) playSound(Sounds.Bank)
    for (const hand of player.hands) hand.bet = 0

    if (player.bank > state.record) {
      state.record = player.bank;
      localStorage.setItem('record', String(player.bank))
    }
  }
  await sleep(300)
  state.isDoubleDown = false;
}

export async function deleteCoin(coinValue: number) {
  if (state.activeHand !== null) return;
  state.currentBet -= coinValue;
  state.currentBetCoins.pop();
  state.players[0].bank += coinValue;
}

/** Reset all hands to an initial state. */
async function resetHands(sleepTime = 900) {
  for (const player of state.players) {
    for (const hand of player.hands) {
      state.shoe.push(...hand.cards)
      hand.reset()
    }
  }
  state.players.forEach((p) => (p.hands = [new Hand()]))
  
  // Reset insurance state
  state.isInsuranceOffered = false
  state.insuranceBet = 0
  
  await sleep(sleepTime)
}

async function redoBet() {
  const prevBet = state.currentBet;
  const prevCoins = [...state.currentBetCoins]; // Create a copy of the previous coins 
  if (state.players[0].bank < state.currentBet) {
    state.currentBet = 0; // Reset the current bet
    state.currentBetCoins = []; // Clear the current bet coins
    if (checkForGameOver()) {
      return;
    };
    return;
  }
  if (checkForGameOver()) return;
  await sleep(100)
  state.currentBet = 0; // Reset the current bet
  state.currentBetCoins = []; // Clear the current bet coins
  await sleep(100)
  state.currentBet = prevBet;
  state.currentBetCoins = prevCoins; // Restore the previous coins
  state.players[0].bank -= prevBet; // Deduct the previous bet from the player's bank
  state.isBetPlaced = true;
  
}

// Add a state variable to control the visibility of the Coins component
export const showCoins = reactive({ visible: false })

// Save state to localStorage
export async function saveStateToStorage() {
  await localStorage.setItem('blackjackState', JSON.stringify(state))
}

export function recordExists(): boolean {
  const state = localStorage.getItem('blackjackState'); 
  return state === 'false' || state === null ? false : true; 
}

// Basic Strategy Chart Logic
type BasicAction = 'H' | 'S' | 'D' | 'P' | 'R' // Hit, Stand, Double, sPlit, suRrender

// Hard totals strategy chart (player total vs dealer upcard)
const hardTotalsChart: Record<number, Record<string, BasicAction>> = {
  5: { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  6: { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  7: { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  8: { '2': 'H', '3': 'H', '4': 'H', '5': 'H', '6': 'H', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  9: { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  10: { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
  11: { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'D', 'A': 'H' },
  12: { '2': 'H', '3': 'H', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  13: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  14: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  15: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'H', '10': 'R', 'A': 'H' },
  16: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'H', '8': 'H', '9': 'R', '10': 'R', 'A': 'R' },
  17: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
  18: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
  19: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
  20: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
  21: { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
}

// Soft totals strategy chart (Ace + other card vs dealer upcard)
const softTotalsChart: Record<string, Record<string, BasicAction>> = {
  'A2': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  'A3': { '2': 'H', '3': 'H', '4': 'H', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  'A4': { '2': 'H', '3': 'H', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  'A5': { '2': 'H', '3': 'H', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  'A6': { '2': 'H', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  'A7': { '2': 'S', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'S', '8': 'S', '9': 'H', '10': 'H', 'A': 'H' },
  'A8': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
  'A9': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
}

// Pair splitting strategy chart
const pairSplittingChart: Record<string, Record<string, BasicAction>> = {
  'AA': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' },
  '22': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  '33': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  '44': { '2': 'H', '3': 'H', '4': 'H', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  '55': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'H', 'A': 'H' },
  '66': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'H', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  '77': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'H', '9': 'H', '10': 'H', 'A': 'H' },
  '88': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'P', '8': 'P', '9': 'P', '10': 'P', 'A': 'P' },
  '99': { '2': 'P', '3': 'P', '4': 'P', '5': 'P', '6': 'P', '7': 'S', '8': 'P', '9': 'P', '10': 'S', 'A': 'S' },
  '1010': { '2': 'S', '3': 'S', '4': 'S', '5': 'S', '6': 'S', '7': 'S', '8': 'S', '9': 'S', '10': 'S', 'A': 'S' },
}

export function getCorrectBasicStrategyAction(playerHand: Hand, dealerUpCard: string): BasicAction {
  const cards = playerHand.cards
  const dealerCard = dealerUpCard === 'J' || dealerUpCard === 'Q' || dealerUpCard === 'K' ? '10' : dealerUpCard
  
  // Check for pairs first
  if (cards.length === 2 && cards[0].rank === cards[1].rank) {
    const pairKey = cards[0].rank === 'A' ? 'AA' : 
                   cards[0].rank === '10' || cards[0].rank === 'J' || cards[0].rank === 'Q' || cards[0].rank === 'K' ? '1010' :
                   cards[0].rank + cards[0].rank
    return pairSplittingChart[pairKey]?.[dealerCard] || 'H'
  }
  
  // Check for soft hands (with Ace)
  const hasAce = cards.some(card => card.rank === 'A')
  const nonAceCards = cards.filter(card => card.rank !== 'A')
  
  if (hasAce && playerHand.total <= 21 && cards.length === 2) {
    const otherCard = nonAceCards[0]?.rank
    if (otherCard && otherCard !== 'A') {
      const softKey = 'A' + otherCard
      const action = softTotalsChart[softKey]?.[dealerCard]
      if (action) return action
    }
  }
  
  // Hard totals
  return hardTotalsChart[playerHand.total]?.[dealerCard] || 'H'
}

export function checkBasicStrategyMove(action: string): void {
  if (!state.activeHand || !state.activePlayer || state.activePlayer.isDealer || userHasBlackjack.value) return
  
  const dealerUpCard = dealer.value.hands[0].cards[1]?.rank || '2'
  const baseCorrectAction = getCorrectBasicStrategyAction(state.activeHand, dealerUpCard)
  
  // Adjust correct action based on game state (D/H, D/S, P/H logic)
  let correctAction = baseCorrectAction
  let correctActionName = ''
  
  if (baseCorrectAction === 'D') {
    // D logic: Double if possible, otherwise Hit or Stand
    if (canDoubleDown.value) {
      correctAction = 'D'
      correctActionName = 'Double Down'
    } else {
      // Need to determine if it's D/H or D/S based on hand total
      // For most D situations, fallback is Hit, except for soft 18+ vs weak dealer
      const isA7 = state.activeHand.cards.length === 2 && 
                   state.activeHand.cards.some(c => c.rank === 'A') && 
                   state.activeHand.cards.some(c => c.rank === '7')
      const dealerWeak = ['3', '4', '5', '6'].includes(dealerUpCard)
      
      if (isA7 && dealerWeak) {
        correctAction = 'S' // D/S situation
        correctActionName = 'Stand (Double if possible)'
      } else {
        correctAction = 'H' // D/H situation  
        correctActionName = 'Hit (Double if possible)'
      }
    }
  } else if (baseCorrectAction === 'P') {
    // P logic: Split if possible, otherwise Hit
    if (canSplit.value) {
      correctAction = 'P'
      correctActionName = 'Split'
    } else {
      correctAction = 'H' // P/H situation
      correctActionName = 'Hit (Split if possible)'
    }
  } else if (baseCorrectAction === 'R') {
    // R logic: Always Hit (surrender not available)
    correctAction = 'H'
    correctActionName = 'Hit (Surrender if available)'
  } else {
    // H or S - use as is
    const actionNames: Record<BasicAction, string> = {
      'H': 'Hit',
      'S': 'Stand', 
      'D': 'Double Down',
      'P': 'Split',
      'R': 'Hit'
    }
    correctActionName = actionNames[correctAction]
  }
  
  // Single mapping for both conversion and display
  const actionMapping: Record<string, { code: BasicAction, name: string }> = {
    'hit': { code: 'H', name: 'Hit' },
    'stand': { code: 'S', name: 'Stand' },
    'doubleDown': { code: 'D', name: 'Double Down' },
    'split': { code: 'P', name: 'Split' }
  }
  
  const playerActionCode = actionMapping[action]?.code || 'H'
  const isCorrect = playerActionCode === correctAction
  
  basicStrategyStats.totalChoices++
  basicStrategyStats.lastPlayerAction = actionMapping[action]?.name || action
  basicStrategyStats.lastCorrectAction = correctActionName
  
  if (isCorrect) {
    basicStrategyStats.correctChoices++
  } else {
    basicStrategyStats.wrongChoices++
  }
  basicStrategyStats.lastMoveCorrect = isCorrect
}

export const accuracy = computed(() => {
  return basicStrategyStats.totalChoices > 0 ? 
    Math.round((basicStrategyStats.correctChoices / basicStrategyStats.totalChoices) * 100) : 0
})

export function resetBasicStrategyStats(): void {
  basicStrategyStats.correctChoices = 0
  basicStrategyStats.wrongChoices = 0
  basicStrategyStats.totalChoices = 0
  basicStrategyStats.dealsPlayed = 0
  basicStrategyStats.lastMoveCorrect = null
  basicStrategyStats.lastCorrectAction = null
  basicStrategyStats.lastPlayerAction = null
}
