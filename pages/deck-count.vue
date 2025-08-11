
<script setup lang="ts">

import CountCards from '~/src/components/CountCards.vue';
import CountTitleScreen from '../src/components/TitleContent/CountTitleScreen.vue';
import { countState } from '../src/store/countStore';
import App from '../src/App.vue';
import CountContent from '../src/components/CountContent.vue';

useHead({
  title: 'Blackjack Coach - deck count simulator'
})

</script>

<template>
  <App>
    <CountTitleScreen  v-if="countState.showTitleScreen"/>
    <CountCards v-if="!countState.showTitleScreen" />
    <template v-slot:content>
      <CountContent />
    </template>
  </App>
</template>


<style scoped>
.count-guide {
  background: rgba(0, 30, 60, 0.85);
  border-radius: 1rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.3);
}


</style>
