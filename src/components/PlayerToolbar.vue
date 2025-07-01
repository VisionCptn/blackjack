<script setup lang="ts">
import { canDoubleDown, canSplit, state, doubleDown, endHand, hit, split } from '../store';
import PlayerBank from './PlayerBank.vue';
import Coins from './Coins.vue';
</script>

<template>
  <div class="toolbar-wrapper">
    <Coins />
    <div role="toolbar">
      <button class="button" :disabled="!canDoubleDown" @click="doubleDown">Double<br />Down</button>
      <button class="button" :disabled="!canSplit" @click="split">Split</button>
      <PlayerBank />
      <button class="button" :disabled="state.isDealing" @click="endHand">Stand</button>
      <button class="button" :disabled="state.isDealing" @click="hit">Hit</button>
    </div>
  </div>
</template>

<style scoped>
[role='toolbar'] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: max-content;
  margin: 0 auto;
  /* order: -1; */
}

.toolbar-wrapper {
    order: -1;
}

button:first-of-type {
  font-size: 2rem;
}
</style>
