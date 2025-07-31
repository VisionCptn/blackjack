import { generateShoe, shuffle } from '../cards'
import type { GameState, HandResult, Player } from '../types'
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

const reacreatePlayers = (bank: number): Player[] => {
  return [
    { isDealer: false, bank: bank, hands: [new Hand()] },
    { isDealer: true, bank: 0, hands: [new Hand()] },
  ]
}

export const state = reactive<GameState>({
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
})

// state.shoe[0].rank = '8';
// state.shoe[1].rank = '8';
// state.shoe[2].rank = '8';
// state.shoe[3].rank = '4';
// state.shoe[4].rank = '2';
// state.shoe[5].rank = '2';
// state.shoe[6].rank = '2';
// state.shoe[7].rank = '2';
// state.shoe[8].rank = '2';
// state.shoe[9].rank = '2';
// state.shoe[10].rank = '2';
// state.shoe[11].rank = '2';
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

export const dealer = computed(() => state.players[state.players.length - 1])

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
  if (state.players[0].bank === 0 && state.currentBet === 0) {
    playSound(Sounds.GameOver)
    state.isGameOver = true
    localStorage.setItem('blackjackState', 'false');
    return true
  }
  return false
}

/** Draw a card from the shoe. */
function drawCard() {
  // reshuffleIfNeeded()
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
    await hit()
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
export async function hit() {
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
  state.isDoubleDown = true;
  await placeBet(state.activePlayer!, state.activeHand!, state.activeHand!.bet)
  await hit()
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
export async function endHand() {
  const isSplit = state.activePlayer && state.activePlayer.hands.length > 1
  if (isSplit && state.activePlayer?.hands[1].cards.length === 1) {
    return playHand(state.activePlayer?.hands[1])
  }
  if (nextPlayer.value) playTurn(nextPlayer.value)
}

export async function clearState() {
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
    
    for (const hand of player.hands) hand.bet = 0
  }
  state.activeHand = null
  state.activePlayer = null
  await sleep(100)
  state.isDoubleDown = false;

  if (state.currentBet > 0) {
    state.currentBet = 0;
  }
  state.currentBetCoins = [];
  showCoins.visible = true;
  state.isBetPlaced = false;
  await resetHands(50);
  state.isDealing = true;
  state.isGameOver = true;
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
  await saveStateToStorage()

  // Show the Coins component and wait for the user to place a bet
  showCoins.visible = true
  // await new Promise((resolve) => {
  //   const interval = setInterval(() => {
  //     if (!showCoins.visible) {
  //       clearInterval(interval)
  //       resolve(null)
  //     }
  //   }, 100)
  // })

  // // Call playRound after the bet is placed
  // playRound()
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
    if (checkForGameOver()) return;
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
export const showCoins = reactive({ visible: true })

// Save state to localStorage
export async function saveStateToStorage() {
  await localStorage.setItem('blackjackState', JSON.stringify(state))
}

// Load state from localStorage
export async function loadStateFromStorage() {
  const data = localStorage.getItem('blackjackState')
  if (data) {
    const parsed = JSON.parse(data)
    for (const key in parsed) {
      if (key in state) {
        if (storageProps.includes(key)) {
          continue; // Skip properties that are not meant to be restored
        }
        if (key === 'players') {
          state[key] = reacreatePlayers(parsed[key][0].bank); // Recreate players with the bank from the saved state
          continue;
        }
        // For objects/arrays, you may want a deeper merge depending on your needs
        state[key] = parsed[key]
      }
    }
  }
}

export function recordExists(): boolean {
  const state = localStorage.getItem('blackjackState'); 
  return state === 'false' || state === null ? false : true; 
}
