<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<script setup lang="ts">
import { state } from './src/store'
import { onMounted } from 'vue'
import GameHand from './src/components/GameHand.vue'
import SvgSprite from './src/components/SvgSprite.vue'
import AnimatedBackground from './src/components/AnimatedBackground.vue'
import { playSound, Sounds, initSound } from './src/sound'
import Coins from './src/components/Coins.vue'
import UserBet from './src/components/UserBet.vue'
import PlayerToolbar from './src/components/PlayerToolbar.vue'
import TitleScreen from './src/components/TitleScreen.vue'
import GameHeader from './src/components/GameHeader.vue'

onMounted(() => {
  initSound()
})

function onClickCapture(e: MouseEvent) {
  const target = e.target as HTMLButtonElement
  if (target?.tagName === 'BUTTON' && !target?.disabled) {
    playSound(Sounds.Click)
  }
}
</script>

<template>
  <SvgSprite />
   <ClientOnly fallback-tag="span" fallback="Loading comments...">
      <AnimatedBackground />
      <GameHeader />
    </ClientOnly>


  <main @click.capture="onClickCapture">

    <section
      class="player"
      v-for="(player, p) in state.players"
      :key="p"
      :class="{ dealer: player.isDealer }"
    >
      <!-- <UserBet v-if="!player.isDealer"/> -->
      <GameHand v-for="hand in player.hands" :hand="hand" :player="player" :key="hand.id" />
    </section>
    <PlayerToolbar />
    <Coins />
  </main>
  <TitleScreen />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8rem;
  padding-bottom: 8rem;
  height: 100%;
  padding: 2rem 1rem 1rem 1rem;
}
section.player {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  min-height: 11.2rem;
  flex-direction: column;
}
section.player:not(.dealer) {
  flex-grow: 0.5;
  flex-wrap: nowrap;
  gap: 4rem 0rem; /* Add gap only from the top */
}
section.player:not(.dealer) > :nth-child(3) {
  margin-bottom: -2rem; /* Adjust the margin for the 4th player */
  /* gap: 1rem 0rem; */
}

section.player.dealer {
  z-index: -1;
}
</style>
