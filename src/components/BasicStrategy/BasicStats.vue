<script setup lang="ts">

import { state, basicStrategyStats, accuracy, resetBasicStrategyStats } from '../../store/basicStrategyStore'

interface Props {
  showResetButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showResetButton: true
})

const handleReset = () => {
  resetBasicStrategyStats()
}

</script>

<template>
    <div class="relative_wrapper">
       <div class="basic-strategy-stats">

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value green">{{ basicStrategyStats.correctChoices }}</div>
        <div class="stat-label">Correct Choices</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ accuracy }}%</div>
        <div class="stat-label">Accuracy</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">{{ basicStrategyStats.dealsPlayed }} / {{ state.rounds }}</div>
        <div class="stat-label">Deals Played</div>
      </div>
    </div>

    <div class="stat-card">
        <div class="stat-value red">{{ basicStrategyStats.wrongChoices }}</div>
        <div class="stat-label">Wrong Choices</div>
      </div>
  </div>
    </div>
</template>

<style scoped>
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

@media (hover: hover) {
    button.header_buttons:hover:not(:disabled) {
        background-color: rgba(from var(--color-off-white) r g b / 1);
        transform: translateY(-0.1rem);
    }
}


.basic-strategy-stats {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: white;
  min-width: 3rem;
  position: absolute;
left: 10px;
top: 7rem;
}


.stats-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-card {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.5rem;
}
.stat-value.green {
  color: var(--color-green);
}

.stat-value.red {
  color: var(--color-chip-red);
}

.stat-label {
  font-size: 0.9rem;
  color: #ccc;
}


.last-move-feedback {
  text-align: center;
  margin-top: 1rem;
}

.feedback-indicator {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.1rem;
}

.feedback-indicator.correct {
  background: rgba(40, 167, 69, 0.8);
  color: white;
}

.feedback-indicator.incorrect {
  background: rgba(220, 53, 69, 0.8);
  color: white;
}
</style >