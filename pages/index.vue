<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<script setup lang="ts">
import App from '../src/App.vue'

import { state, clearState } from '../src/store/store'
import GameHand from '../src/components/GameHand.vue'
import PlayerToolbar from '../src/components/PlayerToolbar.vue'
import TitleScreen from '../src/components/TitleScreen.vue'

import MainContent from '../src/components/MainContent.vue'
import ContentTopControls from '../src/components/ContentTopControls.vue';

useHead({
  title: 'Blackjack Coach - Play Blackjack free'
})

</script>

<template>
  <App>
    <TitleScreen />
    <div v-show="!state.isGameOver" class="content_wrapper">
      <ContentTopControls :home-click="clearState"/>
      <main>
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

  <template v-slot:content>
    <MainContent />
  </template>
  </App>
</template>

<style scoped>

.main-layout {
   background: radial-gradient(circle closest-corner at top 50% right calc(50% + 160px),rgba(0,0,0,0) 0,rgba(0,0,0,.45) 98%),repeat center center url(/green_table.webp);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100dvh - 47px);
}

  .content_wrapper {
    height: 100%;
  }

.content-area {
  flex: 1 1 0%;
  min-width: 0;
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
  /* should fix issue with jumping in on row wheh hand is splited */
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;
  gap: 3rem;
  min-height: 11.2rem;
  flex-direction: column;
}

section.player:not(.dealer) {
  flex-grow: 0.5;
  max-height: 28rem;
}
section.player:not(.dealer) > :nth-child(3) {
  margin-bottom: -2rem; /* Adjust the margin for the 4th player */
  /* gap: 1rem 0rem; */
}

</style>
