<template>
<div class="user-bet-container" v-show="state.currentBet > 0">
  <div class="user-bet">
    <div class="chip-stack">
      <div class="chip-container" v-for="(coin, index) in state.currentBetCoins" :key="index">
        <Chip :key="index" :color="coin.color" @click="() => deleteCoin(coin.value)" :value="coin.value" :fontSize="'1rem'" :width="'4rem'" :height="'4rem'" />
      </div>
      <!-- <span class="chip-number">{{ coin.value }}</span> -->
    </div>
  </div>
  <div class="user-bet-number">{{ state.isDoubleDown ? state.currentBet * 2 : state.currentBet }}</div>
</div>
<!-- Render user-bet-number below coins -->

</template>

<!-- <Chip
      v-for="(coin, index) in coins"
      :key="index"
      :color="coin.color"
      :width="'5rem'"
      :height="'5rem'"
      :style="`--chip-index: ${n - 1}`"
    /> -->

<script lang="ts" setup>

import Chip from './Chip.vue';
import * as defaulStore from '../store/store';

const store = inject('gameStore', defaulStore);
const state = store.state;


let deleteCoin = (coinValue: number) => {
    store.deleteCoin(coinValue);
}
</script>

<style scoped>
.user-bet-number {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-top: 4.5rem;
}
.user-bet {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* gap: 1rem; */
}
.user-bet-container{
    position: absolute;
    left: -5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chip-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.chip-container {
  position: absolute; /* Stack chips on top of each other */
  width: 4rem;
  height: 4rem;
  /* transform: translateY(calc(var(--chip-index) * -15px)); Shift each chip upwards */
}

.chip-number {
  /* margin-top: 1rem; */
  /* font-size: 1.5rem; */
  font-weight: bold;
  color: white;
}
</style>
