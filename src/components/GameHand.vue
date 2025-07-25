<script setup lang="ts">
import { computed } from 'vue'
import type { Card, Player, Hand } from '../types'
import { dealer, state, canTakeInsurance, takeInsurance } from '../store/store'
import HandTotal from './HandTotal.vue'
import PlayingCard from './PlayingCard.vue'

import UserBet from './UserBet.vue'

const props = defineProps<{
  hand: Hand
  player: Player
}>()

const isActiveHand = computed(() => state.activeHand === props.hand && !props.player.isDealer)

const isSplitHand = computed(
  () => state.activePlayer === props.player && !!state.activeHand && props.player.hands.length > 1,
);

const isDealer = computed(() => dealer.value.hands.includes(props.hand))

function isFaceDown(card: Card) {
  if (!isDealer.value) return false
  if (props.hand.cards.indexOf(card) !== 0) return false
  return !state.showDealerHoleCard
}

function isSplitCard(card: Card) {
  if (props.player.hands.indexOf(props.hand) !== 1) return false
  return props.hand.cards.indexOf(card) === 0
}
</script>

<template>
  
  <article class="hand" :class="{ 'active-hand': isActiveHand, 'split-hand': isSplitHand }">
    <UserBet v-if="!player.isDealer" :key="Date.now()" :class="{'opacityHalf': isSplitHand && !isActiveHand }" />
    <div v-if="canTakeInsurance" class="buttonWrapper">
      <button class="button" @click="takeInsurance" v-if="player.isDealer">insure</button>
    </div>
    <h2 class="sr-only">{{ isDealer ? "Dealer's" : 'Your' }} hand</h2>
    <transition-group name="deal">
      <PlayingCard
      v-for="card in hand.cards"
      :card="card"
      :is-face-down="isFaceDown(card)"
      :key="card.index"
      :class="{ 'split-card': isSplitCard(card) }"
      />
    </transition-group>
    <!-- todo  maybe render later with correct icons-->
    <!-- <HandBet :hand="hand" /> -->
    <div v-if="!player.isDealer" class="hand-result">
      <transition name="result">
        <svg v-if="hand.result" :class="{ blackjack: hand.result === 'blackjack' }">
          <use :href="`#result-${hand.result}`" />
        </svg>
      </transition>
    </div>
    <HandTotal :hand="hand" />
  </article>
</template>

<style scoped>

.hand {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  position: relative;
  transition: scale 0.3s ease-in-out;
  isolation: isolate;
  width: fit-content;
  min-height: 11.2rem;
  min-width: 8rem;
  max-width: 60vw;
}
.active-hand {
  scale: 1.3;
  transform-origin: center center;
  z-index: 1;
}
@media (prefers-reduced-motion: reduce) {
  .active-hand {
    scale: 1;
  }
}
.split-hand:not(.active-hand) {
  opacity: 0.5;
}

.hand {
  max-width: 25rem;
}

.player:not(.dealer) .hand .card:nth-child(n+6) {
  margin-top: -9rem;
}

.opacityHalf {
  opacity: 0.5;
}
.hand-result {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.hand-result svg {
  position: absolute;
  margin-top: 2rem;
  width: 14rem;
}
.hand-result svg.blackjack {
  transform: scale(1.5);
}
.split-card {
  animation: split 0.3s ease-in-out forwards;
}
.deal-enter-active {
  z-index: 2;
  animation: deal 0.3s;
}
.deal-leave-active:not(.active-hand .card) {
  z-index: 2;
  animation: deal 0.3s reverse;
}
.result-enter-active {
  animation: unmask 0.4s ease-in-out forwards;
}
.result-leave-active {
  animation: unmask 0.1s ease-in-out reverse;
  z-index: 2;
}
/* button.button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 2.5rem;
    font-variation-settings: 'wght' 500;
    line-height: 1;
    padding: 1rem 1.5rem;
    border-radius: 1.75rem;
    border: 0;
    letter-spacing: 0.05rem;
    background-color: rgba(from var(--color-off-white) r g b / 0.9);
    color: currentColor;
    cursor: pointer;
} */
 .buttonWrapper {
  width: max-content;
  position: absolute;
  left: -10rem;
  top: 3rem;
 }
@keyframes deal {
  0% {
    transform: translate3d(0, -100vh, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes split {
  0% {
    transform: translate3d(-7rem, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes unmask {
  0% {
    clip-path: inset(0 0 100% 100%);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}
</style>
