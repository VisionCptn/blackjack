<template>
    <div class="coins-wrapper">
        <!-- <transition name="fade"> -->
            <div v-if="state.showDealBtn && !state.autoDeal">
                <button class="button"  @click="() => playRoundBasic()">
                    Deal
                </button>
            </div>
        <!-- </transition> -->
        <!-- <transition name="fade"> -->
            <div v-if="!state.showDealBtn && basicStrategyStats.lastMoveCorrect !== null" class="last-move-feedback">
                <div 
                :class="['feedback-indicator', basicStrategyStats.lastMoveCorrect ? 'correct' : 'incorrect']"
                >
                {{ basicStrategyStats.lastMoveCorrect ? '✓ Correct!' : 'Incorrect:' }}
                <span v-if="!basicStrategyStats.lastMoveCorrect"> You should {{basicStrategyStats.lastCorrectAction}}</span>
                </div>
            </div>
        <!-- </transition> -->
    </div>

</template>

<!-- <script lang="ts" setup></script> -->
<script lang="ts" setup>
import * as defaultStore from '../../store/basicStrategyStore';
import { basicStrategyStats } from '../../store/basicStrategyStore'

const {state, playRound} = defaultStore;

async function playRoundBasic() {
  playRound();
};

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
  bottom: 1rem;
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


.last-move-feedback {
  text-align: center;
  margin-bottom: 2rem;
}

.feedback-indicator {
    padding: 0.7rem 1.5rem;
    border-radius: 1.75rem; 
    font-weight: bold;
    font-size: 2.3rem;
}

.feedback-indicator.correct {
  background: rgba(40, 167, 69, 0.8);
  color: white;
}

.feedback-indicator.incorrect {
  background: rgba(220, 53, 69, 0.8);
  color: white;
}

.feedback-result {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.feedback-details {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.move-comparison {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.your-move {
  color: #ffcccb;
  font-weight: normal;
}

.correct-move {
  color: #90ee90;
  font-weight: bold;
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