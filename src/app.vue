<script setup lang="ts">
  import GameHeader from './components/GameHeader.vue';
  import SvgSprite from './components/SvgSprite.vue';

  console.log(GameHeader)
</script>

<template>
  <UApp>
    <SvgSprite />
    <GameHeader />
    <div class="main-layout">
      <div class="content-area">
          <slot />
      </div>
    </div>
    <NuxtPage />
  </UApp>
</template>

<style>

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

</style>