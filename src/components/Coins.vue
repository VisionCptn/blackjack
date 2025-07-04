<template>
  <transition name="fade">
    <div class="coins-wrapper">
      <h2 v-show="showBetText" class="bet-text">Place your bet</h2>
      <div v-show="showCoins.visible" role="coins"> 
        <div class="chip-container" v-for="(coin, index) in coins" :key="index">
          <Chip :onClick="() => addBet(coin.value)" :color="coin.color" :value="coin.value" :width="'5rem'" :height="'5rem'" />
          </div>
          <button class="button" :disabled="state.currentBet === 0" @click="() => playRoundAndHideCoins()">
            Deal
          </button>
        <!-- </span> -->
      </div>
      
    </div>
 
  </transition>
</template>

<!-- <script lang="ts" setup></script> -->
<script lang="ts" setup>
import { showCoins, addBet, state, playRound, sleep} from '../store/store';
import { coins } from '../coins';
import Chip from './Chip.vue';
import { ref, watch } from 'vue'

const showBetText = ref(true)
let betTextTimeout: ReturnType<typeof setTimeout> | null = null
  
async function playRoundAndHideCoins() {
  if (!showCoins.visible) return;
  showCoins.visible = false;
  await sleep(100);
  playRound();
};


watch(() => state.currentBet, (newVal, oldVal) => {
  // if (newVal > 0) showBetText.value = false
  // if (newVal == 0) showBetText.value = true
   if (newVal > 0) {
    showBetText.value = false
    if (betTextTimeout) {
      clearTimeout(betTextTimeout)
      betTextTimeout = null
    }
  }
  if (newVal === 0) {
    if (betTextTimeout) clearTimeout(betTextTimeout)
    betTextTimeout = setTimeout(() => {
      showBetText.value = true
    }, 300) // Adjust delay as needed (ms)
  }
})

</script>

<style scoped>

.coins-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
  position: relative;
}

[role='coins'] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: max-content;
  margin: 0 auto;
  order: -1;
  bottom: 3rem;
  position: absolute;
}
.chip-container {
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 5rem;
}

button {
  font-size: 2.5rem;
  padding: 1.5rem 2.5rem;
  display: block;
  /* margin: 0 auto; Center the button horizontally */
  grid-column: span 5;
  justify-self: center;
  margin-top: 2rem;
}

.chip {
  /* height: 100%; */
  /* aspect-ratio: 10; */
  /* size: 1rem; */
  width: 100%;
  height: 100%;
}
.chip-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem; /* Adjust font size as needed */
  font-weight: bold;
  color: white; /* Adjust color to match your design */
  pointer-events: none; /* Prevent interaction with the number */
}
/* -color-chip-gray: #E8E8E8;
  --color-chip-blue: #0071E3;
  --color-chip-black: #2A2A28;
  --color-chip-red: #DF0100; */
.chip.gray {
      /* color: var(--color-chip); */
  /* color: var(--color-chip-gray); */
  --color-chip: #afa1a1;
}
.chip.blue {
    --color-chip: #0071E3; 
}
.chip.red {
    --color-chip: #DF0100; 
}
.chip.black {
    --color-chip: #2A2A28; 
}
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.bet-text {
  bottom: 20rem;
  position: absolute;
  font-size: 3rem;
  color: var(--color-off-white);
}
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 2160deg);
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>