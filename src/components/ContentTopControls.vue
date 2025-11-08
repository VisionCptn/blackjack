<script setup lang="ts">

import { globalState } from '../store/globalStore';

interface Props {
  homeClick?: () => void
  muteClick?: () => void
}

const props = defineProps<Props>()

const muteToggle = () => {
  if (props.muteClick) {
    props.muteClick();
    return;
  }

  globalState.isMuted = !globalState.isMuted
}
</script>

<template>
    <div class="relative_wrapper">
      <div class="game_buttons">
      <button class="header_buttons" @click="props.homeClick?.()">
        <svg  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          width="3rem" height="3rem" viewBox="0 0 495.398 495.398"
          xml:space="preserve">
          <g>
            <g>
              <g>
                <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
                  v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
                  c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
                  c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
                <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
                  c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
                  c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button class="header_buttons" @click="muteToggle">
        
        <svg v-if="globalState.isMuted" fill="#000000" width="3rem" height="3rem" viewBox="-1.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M7.676 4.938v9.63c0 .61-.353.756-.784.325l-2.896-2.896H2.02A1.111 1.111 0 0 1 .911 10.89V8.618a1.112 1.112 0 0 1 1.108-1.109h1.977l2.896-2.896c.43-.43.784-.284.784.325zm7.251 6.888a.554.554 0 1 1-.784.784l-2.072-2.073-2.073 2.073a.554.554 0 1 1-.784-.784l2.073-2.073L9.214 7.68a.554.554 0 0 1 .784-.783L12.07 8.97l2.072-2.073a.554.554 0 0 1 .784.783l-2.072 2.073z"/></svg>
        
        <svg v-if="!globalState.isMuted" fill="#000000" width="3rem" height="3rem" viewBox="-2.5 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M7.365 4.785v9.63c0 .61-.353.756-.784.325l-2.896-2.896H1.708A1.112 1.112 0 0 1 .6 10.736V8.464a1.112 1.112 0 0 1 1.108-1.108h1.977L6.581 4.46c.43-.43.784-.285.784.325zm2.468 7.311a3.53 3.53 0 0 0 0-4.992.554.554 0 0 0-.784.784 2.425 2.425 0 0 1 0 3.425.554.554 0 1 0 .784.783zm1.791 1.792a6.059 6.059 0 0 0 0-8.575.554.554 0 1 0-.784.783 4.955 4.955 0 0 1 0 7.008.554.554 0 1 0 .784.784z"/></svg>
      </button>
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
.header_buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-variation-settings: 'wght' 500;
  line-height: 1;
  padding: 0.8rem 0.8rem;
  border-radius: 1rem;
  border: 0;
  letter-spacing: 0.05rem;
  background-color: rgba(from var(--color-off-white) r g b / 0.9);
  color: currentColor;
  cursor: pointer;
}


@media (hover: hover) {
    button.header_buttons:hover:not(:disabled) {
        background-color: rgba(from var(--color-off-white) r g b / 1);
        transform: translateY(-0.1rem);
    }
}
</style >