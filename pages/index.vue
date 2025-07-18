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
import { playSound, Sounds, initSound } from '../src/sound'
// import Coins from './src/components/Coins.vue'
import UserBet from '../src/components/UserBet.vue'
import PlayerToolbar from '../src/components/PlayerToolbar.vue'
import TitleScreen from '../src/components/TitleScreen.vue'
import GameHeader from '../src/components/GameHeader.vue'
import MainContent from '../src/components/MainContent.vue'

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
          <GameHeader />
  <div class="main-layout">
    <div class="content-area">
      <SvgSprite />
      <ClientOnly fallback-tag="span" fallback="Loading comments...">
        <!-- <AnimatedBackground /> -->

      </ClientOnly>
      <TitleScreen />
      <main v-show="!state.isGameOver" @click.capture="onClickCapture">
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
    </div>
    <aside class="ads-vertical">
      <Adsbygoogle ad-slot="ad_desktop_1" class="ad-block" />
      <Adsbygoogle ad-slot="ad_desktop_2" class="ad-block" />
    </aside>
  </div>
  <div class="blueBG w-full float-left">
    <MainContent />
  </div>
      
</template>

<style scoped>

.main-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100dvh - 47px);
}
.content-area {
  flex: 1 1 0%;
  min-width: 0;
}
aside.ads-vertical {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 300px;
  min-width: 300px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
}
.ad-block {
  width: 300px;
  height: 250px;
  background: #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 0;
}
@media (max-width: 1023px) {
  aside.ads-vertical {
    display: none;
  }
  .main-layout {
    flex-direction: column;
  }
}


main {
  justify-content: flex-start;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8rem;
  padding-bottom: 8rem;
  height: 100%;
  padding: 2rem 1rem 1rem 1rem;
  flex: 1 1 0%;
}


section.player {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  min-height: 11.2rem;
  flex-direction: column;
}

section.player:not(.dealer) {
  flex-grow: 0.5;
}
section.player:not(.dealer) > :nth-child(3) {
  margin-bottom: -2rem; /* Adjust the margin for the 4th player */
  /* gap: 1rem 0rem; */
}

.blueBG {
  background: url('../public/poker_table-01.png');
  background-size: 200px 200px;
}

</style>
