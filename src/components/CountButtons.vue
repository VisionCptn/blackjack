<script setup lang="ts">
import { countState, checkHiLoResult, dealCard } from '../store/countStore';
import { ref, watch } from 'vue';

const buttonsEnabled = ref(false);

watch(() => countState.isAllCardsDealt, (newVal) => {
  if (newVal) {
    // Delay enabling buttons by 1.5 seconds
    setTimeout(() => {
      buttonsEnabled.value = true;
    }, 2000);
  } else {
    buttonsEnabled.value = false;
  }
});
</script>

<template>
  <div class="toolbar-wrapper">
    <div role="toolbar">
      <transition name="fade">
      <div v-show="countState.dealSpeed === 0 && countState.isAllCardsDealt || countState.dealSpeed !== 0" class="buttonWrapper three">
          <button class="button" :disabled="!buttonsEnabled" @click="checkHiLoResult(-1)">lo -1</button>
          <button class="button" :disabled="!buttonsEnabled" @click="checkHiLoResult(0)">even 0</button>
          <button class="button" :disabled="!buttonsEnabled" @click="checkHiLoResult(+1)">hi +1</button>
        </div>
      </transition>
      <transition name="fade">
      <div v-show="countState.dealSpeed === 0 && !countState.isAllCardsDealt" class="buttonWrapper one">
          <button class="button" @click="dealCard()">deal</button>
        </div>
      </transition>
    </div>
  </div>
  {{  }}
</template>

<style scoped>
[role='toolbar'] {
  height: 6.5rem;
  /* order: -1; */
}
.buttonWrapper {
  display: grid;
  
  gap: 0.5rem;
  width: max-content;
  margin: 0 auto;
}
.one {
  grid-template-columns: repeat(1, 1fr);
}
.three {
  grid-template-columns: repeat(3, 1fr);
}


.toolbar-wrapper {
    order: -1;
}

.toolbar-wrapper button {
    font-size: 2.5rem;
    padding: 1.5rem 2.5rem;

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 
button:first-of-type {
  font-size: 2rem;
} */
</style>
