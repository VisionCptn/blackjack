<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<script setup lang="ts">
import { state } from '../src/store/store'
import { onMounted } from 'vue'
import GameHand from '../src/components/GameHand.vue'
import SvgSprite from '../src/components/SvgSprite.vue'
import AnimatedBackground from '../src/components/AnimatedBackground.vue'
import { playSound, Sounds, initSound } from '../src/sound'
// import Coins from './src/components/Coins.vue'
import UserBet from '../src/components/UserBet.vue'
import PlayerToolbar from '../src/components/PlayerToolbar.vue'
import TitleScreen from '../src/components/TitleScreen.vue'
import GameHeader from '../src/components/GameHeader.vue'
import CenteredBluePanel from '../src/components/CenteredBluePanel.vue'

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
      <!-- <AnimatedBackground /> -->
      <GameHeader />
    </ClientOnly>


  <main @click.capture="onClickCapture">
    
    <!-- <Coins /> -->
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
  </main>
  <div class="blueBG w-full float-left">
    <CenteredBluePanel />
  </div>
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
  height: 100vh;
  /* width: calc(100% - 300px); */
}

@media (min-width: 600px) and (min-height: 768px) {
  main {
    width: 100%;
  }
}

@media (min-width: 700px) and (min-height: 900px) {
  main {
    width: calc(100% - 300px);
  }
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

/* section.player.dealer {
  z-index: -1;
} */


.blueBG {
    background-color: var(--color-chip); /* Dark green felt base */
  background-image: 
    repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.05) 0px,
      rgba(0, 0, 0, 0.05) 2px,
      transparent 2px,
      transparent 6px
    );
  background-size: cover;
  font-family: sans-serif;
}

</style>
