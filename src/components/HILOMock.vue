<script setup lang="ts">
import PlayingCard from './PlayingCard.vue'
import { dealAllCards, countState, resetState } from '../store/countStore';
import { computed } from 'vue';
import Controls from './CountButtons.vue';
import ContentTopControls from './ContentTopControls.vue';

const lastDealtCard = computed(() => {
  const cards = countState.dealtCards
  return cards.length ? [cards[cards.length - 1]] : []
});

async function homeClick() {
  countState.showTitleScreen = true;
  await resetState();
}

const low = [
    {rank: '2', suit: '♦', index: 1},
    {rank: '3', suit: '♣', index: 2},
    {rank: '4', suit: '♥', index: 3},
    {rank: '5', suit: '♦', index: 4},
    {rank: '6', suit: '♥', index: 5},
]

const mid = [
    {rank: '7', suit: '♣', index: 10},
    {rank: '8', suit: '♦', index: 11},
    {rank: '9', suit: '♥', index: 12},
]

const hi = [
    {rank: '10', suit: '♦', index: 20},
    {rank: 'J', suit: '♣', index: 21},
    {rank: 'Q', suit: '♥', index: 22},
    {rank: 'A', suit: '♦', index: 23},
]

</script>

<template>
<transition name="fade" v-if="countState.showCountdown">
    <div class="countdown-text">
      {{ countState.countdown > 0 ? countState.countdown : 'Begin!' }}
    </div>
</transition>
  <div class="content_wrapper" >
    <ContentTopControls :homeClick="homeClick" />
    <div class="count_wrapper">
        <section class="player">
            <article class="hand">
                <PlayingCard
                    v-for="card in low"
                    :card="card"
                    :key="card.index"
                    
                />
            </article>
            <p class="ss">2 - 6 = +1</p>
        </section>

        <section class="player">
            <article class="hand">
                <PlayingCard
                    v-for="card in mid"
                    :card="card"
                    :key="card.index"
                />
            </article>
            <p class="ss">7 - 9 = 0</p>
        </section>


        <section class="player">
            <article class="hand">
                <PlayingCard
                    v-for="card in hi"
                    :card="card"
                    :key="card.index"
                   
                />
            </article>
            <p class="ss">10 - Ace = -1</p>
        </section>




      <!-- {{ countState.result }}
      {{ countState.hiddenCard.rank }} -->
      <p>{{ countState.currentCount }}</p>
    </div>
  </div>
  
</template>

<style scoped>

.ss{
    font-size: 40px;
    color: white;
}

.player {
        flex-grow: 0.5;
    max-height: 28rem;
}

section.player[data-v-02281a80] {
    display: flex;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-content: center;
    gap: 3rem;
    min-height: 11.2rem;
    flex-direction: column;
}





.relative_wrapper {
  position: relative;
}
.game_buttons {
  z-index: 10;
  top: 15px;
  left: 15px;
  position: absolute;
  display: flex;
  gap: 1rem;
  width: -moz-max-content;
  width: max-content;
  margin: 0 auto;
}
.header_buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-variation-settings: 'wght' 500;
  line-height: 1;
  padding: 0.8rem 0.8rem;
  border-radius: 1rem;
  border: 0;
  letter-spacing: 0.05rem;
  background-color: rgba(from var(--color-off-white) r g b / 0.9);
  color: currentColor;
  cursor: pointer;
}


@media (hover: hover) {
    button.header_buttons:hover:not(:disabled) {
        background-color: rgba(from var(--color-off-white) r g b / 1);
        transform: translateY(-0.1rem);
    }
}

  .count_wrapper {
    justify-content: flex-start;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 8rem;
    padding-bottom: 8rem;
    height: 100%;
    padding: 2rem 1rem 1rem 1rem;
    position: relative;
  }
  
  .content_wrapper {
    height: 100%;
  }

  .countdown-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }
  
  .countdown-text {
    font-size: 6rem;
    font-weight: bold;
    color: white;
    text-align: center;
     display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .result-enter-active {
    animation: unmask 0.4s ease-in-out forwards;
  }
  .result-leave-active {
    animation: unmask 0.1s ease-in-out reverse;
    z-index: 2;
  }
  .count_wrapper .card{
       margin-left: 5px;
  }

</style>