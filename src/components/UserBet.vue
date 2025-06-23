<template>
<div class="user-bet-container" v-show="state.currentBet > 0">
    
  <div class="user-bet">
    <div class="chip-stack">
      <div class="chip-container" v-for="(coin, index) in state.currentBetCoins" :key="index">
        <Chip :key="index" :color="coin.color" @click="() => deleteCoin(coin.value)" :value="coin.value" :width="'6rem'" :height="'6rem'" />
      </div>
      <!-- <span class="chip-number">{{ coin.value }}</span> -->
    </div>
  </div>
  <div class="user-bet-number">{{ state.currentBet }}</div>
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
import { ref } from 'vue';
import Chip from './Chip.vue';
import { coins } from '../coins';
import { state } from '../store';


let deleteCoin = (coinValue: number) => {
    if (state.activeHand !== null) return;
    state.currentBet -= coinValue;
    state.currentBetCoins.pop();
    state.players[0].bank += coinValue;
}
// currentBetCoins
// Example coins data
// const coins = ref([
//   { value: 1, count: 4, color: 'gray' },
//   { value: 5, count: 3, color: 'red' },
//   { value: 25, count: 2, color: 'blue' },
//   { value: 100, count: 1, color: 'black' },
// ]);
</script>

<style scoped>
.user-bet-number {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-top: 7rem;
}
.user-bet {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* gap: 1rem; */
}
.user-bet-container{
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
  width: 6rem;
  height: 6rem;
  /* transform: translateY(calc(var(--chip-index) * -15px)); Shift each chip upwards */
}

.chip-number {
  /* margin-top: 1rem; */
  /* font-size: 1.5rem; */
  font-weight: bold;
  color: white;
}
</style>
