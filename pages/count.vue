
<script setup lang="ts">
import GameHeader from '../src/components/GameHeader.vue'
import CountCards from '~/src/components/CountCards.vue';
import SvgSprite from '../src/components/SvgSprite.vue';
import CountTitleScreen from '../src/components/CountTitleScreen.vue';
import { countState } from '../src/store/countStore';
import App from '../src/app.vue';
// Card counting guide page
</script>

<template>
  <App>
  <section>
    <!-- <UserBet v-if="!player.isDealer"/> -->
    <CountTitleScreen />
    <CountCards v-if="!countState.showTitleScreen" />
    
  </section>
    <div class="count-guide p-8 max-w-2xl mx-auto text-white">
      <h1 class="text-3xl font-bold mb-4">Card Counting Guide</h1>
      <p class="mb-4">Learn the basics of card counting in blackjack to improve your odds. This guide covers the Hi-Lo system, the most popular and beginner-friendly method.</p>
      <h2 class="text-xl font-semibold mt-6 mb-2">Hi-Lo System</h2>
      <ul class="list-disc ml-6 mb-4">
        <li>2–6: <span class="text-green-400 font-bold">+1</span></li>
        <li>7–9: <span class="text-yellow-300 font-bold">0</span></li>
        <li>10–A: <span class="text-red-400 font-bold">-1</span></li>
      </ul>
      <h2 class="text-xl font-semibold mt-6 mb-2">How to Count</h2>
      <ol class="list-decimal ml-6 mb-4">
        <li>Start at 0 for a new deck or shoe.</li>
        <li>Add or subtract based on each card dealt using the Hi-Lo values above.</li>
        <li>The higher the count, the more high cards remain in the deck (good for the player).</li>
        <li>Adjust your bets when the count is high.</li>
      </ol>
      <h2 class="text-xl font-semibold mt-6 mb-2">Tips</h2>
      <ul class="list-disc ml-6 mb-4">
        <li>Practice keeping the count while watching games or using a deck at home.</li>
        <li>Don’t let the count affect your playing speed or behavior at the table.</li>
        <li>Remember, card counting is not illegal, but casinos may ask you to leave if you’re caught.</li>
      </ul>
    </div>
  </App>
</template>


<style scoped>
.count-guide {
  background: rgba(0, 30, 60, 0.85);
  border-radius: 1rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.3);
}

section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  min-height: 11.2rem;
  flex-direction: column;
}
</style>
