<script setup lang="ts">
import PlayingCard from './PlayingCard.vue'
import { dealAllCards, countState } from '../store/countStore';
import { computed } from 'vue';

const lastDealtCard = computed(() => {
  const cards = countState.dealtCards
  return cards.length ? [cards[cards.length - 1]] : []
})

dealAllCards();

</script>

<template>
    <SvgSprite />
<PlayingCard
    v-for="card in lastDealtCard"
    :card="card"
    :key="card.index"
  />
</template>