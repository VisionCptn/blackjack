<script setup lang="ts">
import { countState } from '../store/countStore'
import { ref } from 'vue'

const value = ref(52) // Default value for the slider

const showTitleScreen = ref(true)

function startGame() {
//   showTitleScreen.value = false
//   resetBank()
//   state.isGameOver = false
}

async function continueGame() {
//   resetBank()
//   await loadStateFromStorage();
//   showTitleScreen.value = false
}

</script>

<template>
  <!-- <transition name="fade" @after-leave="playRound"> -->
  <transition name="fade">
    <section v-if="countState.showTitleScreen" class="title-screen">
      <svg>
        <use href="#logo" />
      </svg>
      <UContainer class="content_wrapper">
        <!-- <div class="content_wrapper"> -->
        <USlider
          v-model="value"
          :step="1"
          :max="120"
          :min="10"
          :default-value="52"
          />
        {{ value }}
      <!-- </div> -->

      <div class="flex items-center justify-between py-3">
                    <span class="text-base text-[2rem] font-medium">Deck size</span>
                    <div class="flex gap-2">
                      <button v-for="n in [1,2,3,4,5,6,8]" :key="n" type="button"
                        class="toggleButton px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        :class="{ 'bg-blue-600 text-green-600': countState.deckCount === n }"
                        @click="countState.deckCount = n"
                      >
                        {{ n }}
                      </button>
                    </div>
                  </div>
                        </UContainer>
        <!-- <div> -->
        <!-- <h1>Bl<span>a</span>ck<span>j</span>ack</h1> -->
        <!-- <p>Blackjack Simulator</p> -->
      <!-- </div> -->
      <transition name="fade" mode="out-in">
        <div>
          <div class="button-row">
            <button class="button" @click="startGame">
              Count
            </button>
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<style scoped>
/* Inline button row for title screen */
.content_wrapper {
    background: rgba(0, 30, 60, 0.85);
    border-radius: 1rem;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
}
.button-row {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}
.title-screen {
  /* position: absolute; */
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3rem;
  /* background-color: var(--color-dark-cyan); */
  height: 100dvh;
  overflow: auto;
  z-index: 9;
}
.title-screen > *:not(svg) {
  position: relative;
}
.title-screen svg {
  width: 70%;
  height: 23%;
}
/* svg {
  position: absolute;
  width: max(86rem, 125vw);
  aspect-ratio: 1;
  opacity: 0.25;
  animation: rotate 120s linear infinite;
} */
h1 {
  color: var(--color-white);
  text-transform: uppercase;
  font-size: 6rem;
  letter-spacing: 0.25rem;
  font-variation-settings: 'wght' 700;
}
p {
  text-transform: uppercase;
  margin: 0;
  color: var(--color-white);
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
}
button {
  font-size: 2.5rem;
  padding: 1.5rem 2.5rem;
}
.progress-container {
  display: flex;
  align-items: center;
  height: 5.5rem;
}
progress {
  width: 300px;
  height: 1rem;
  border: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  appearance: none;
  background-color: var(--color-black);
  opacity: 0.5;
}
progress::-webkit-progress-bar {
  background-color: var(--color-black);
}
progress::-webkit-progress-value {
  background-color: var(--color-white);
}
progress::-moz-progress-bar {
  background-color: var(--color-white);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* @keyframes rotate {
  to {
    transform: rotate(360deg);
  }
} */
</style>
