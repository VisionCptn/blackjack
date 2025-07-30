<script setup lang="ts">
  import GameHeader from './components/GameHeader.vue';
  import SvgSprite from './components/SvgSprite.vue';
  
  import { playSound, Sounds, initSound } from '../src/sound'
  import { onMounted } from 'vue'

  onMounted(() => {
    initSound();
    const script = document.createElement('script')
    script.src = 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
    script.async = true
    script.setAttribute('custom-element', 'amp-ad')
    document.head.appendChild(script)
  });

function onClickCapture(e: MouseEvent) {
  const target = e.target as HTMLButtonElement
  if (target?.tagName === 'BUTTON' && !target?.disabled) {
    playSound(Sounds.Click)
  }
}

</script>

<template>
    <SvgSprite />
    <GameHeader />
    <div @click.capture="onClickCapture" class="main-layout">
      <div class="content-area">
          <slot />
      </div>
      <aside class="ads-vertical">
        <amp-ad
            layout="fixed"
            width="300"
            height="250"
            type="adsense"
            data-ad-client="ca-pub-7216237547913391"
            data-ad-slot="4293360341">
        </amp-ad>
        <amp-ad
            layout="fixed"
            width="300"
            height="250"
            type="adsense"
            data-ad-client="ca-pub-7216237547913391"
            data-ad-slot="4293360341">
        </amp-ad>
        <!-- <Adsbygoogle ad-slot="ad_desktop_2" class="ad-block" /> -->
      </aside>
    </div>
    <div class="blueBG w-full float-left">        
      <slot name="content">

        Default content goes here.
      </slot>
  </div>
    <NuxtPage />
</template>

<style>

.main-layout {
   background: radial-gradient(circle closest-corner at top 50% right calc(50% + 160px),rgba(0,0,0,0) 0,rgba(0,0,0,.45) 98%),repeat center center url(/green_table.webp);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100dvh - 47px);
}
.content-area {
  flex: 1 1 0%;
  min-width: 0;
}
.blueBG {
  background: url('../public/poker_table-01.png');
  background-size: 200px 200px;
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

</style>
