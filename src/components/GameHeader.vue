<script setup lang="ts">
import { state, endRound } from '../store/store'
import { ref } from 'vue'
import SettingsModal from './SettingsModal.vue'
import DropdownMenu from './DropdownMenu.vue'
import { resetState, countState } from '../store/countStore';

const showSettings = ref(false)

const route = useRoute()

async function countClick() {
  countState.showTitleScreen = true;
  await resetState();
}

async function indexClick() {
  await endRound();
  state.isGameOver = true;
}

function handleCountClick(event: Event) {
  if (route.path === '/count') {
    event.preventDefault();
    countClick();
  }
}

function handleIndexClick(event: Event) {
  if (route.path === '/') {
    event.preventDefault();
    indexClick();
  }
}

</script>

<template>
  <header>
    <div class="header_wrapper">
      <div class="logoWrapper">
        <NuxtLink @click="handleIndexClick" class="logo" to="/">
          <svg aria-hidden="true">
            <use href="#logo"/>
          </svg>
        </NuxtLink>
      </div>
      <SettingsModal v-model:modelValue="showSettings" />
      <nav class="links">
        <NuxtLink to="/" @click="handleIndexClick" class="nav-link" title="Home">
          <span class="headerTextLink text-2xl">Play Blackjack</span>
        </NuxtLink>
        <NuxtLink to="/count" @click="handleCountClick" class="nav-link" title="Card Counting Guide">
          <span class="headerTextLink text-2xl">Deck Count</span>
        </NuxtLink>
      </nav>
      <div id="navigation_menu">
        <DropdownMenu />
      </div>
    </div>
  </header>
</template>

<style scoped>
.logoWrapper svg{
  height: 74px;
  margin-top: 7px;
  width: 200px;
}
.header_wrapper {
  background: url('../../public/poker_table-01.png');
  background-size: 100px 100px;
  border-bottom: solid 3px rgba(0, 0, 0, .5);
  height: 47px;
  position: relative;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* justify-content: space-between; */
}
.settings-absolute {
  position: absolute;
  top: 47px;    /* height of header */
  left: 0;
  z-index: 20;
  background: var(--color-black, #161718);
  border-radius: 0 0 8px 0;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
nav.links {
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  align-items: center;
  white-space: nowrap;
  text-align: right;
  margin-top: 7px;
  margin-left: 20px;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: opacity 0.2s, color 0.2s;
}
.nav-link:hover {
  opacity: 1;
  color: var(--color-black);
}
.headerTextLink{
  /* font-size: 1.5rem; */
  font-weight: 500;
  color: var(--color-off-white);
  text-decoration: none;
  pointer-events: auto;
}
.headerTextLink:hover {
  text-decoration: underline;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
h1 {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
a:not(.logo),
button {
  color: var(--color-off-white);
  opacity: 0.7;
}


button {
  padding: 0.625rem;
  background: transparent;
}

button:focus-visible,
button:active {
  color: var(--color-black);
}

/* #navigation_menu {
  display: none;
}
@media (max-width: 1023px) {
  .header_wrapper .links {
    display: none;
  }
}
@media (min-width: 1022px) {
  .header_wrapper #navigation_menu {
    display: block;
    
  }
  .header_wrapper{
    flex-direction: row-reverse;
  }
} */
 @media (max-width: 1023px) {
  .header_wrapper {
    justify-content: space-between;
  }
  .header_wrapper .links {
    display: none;
  }
  .header_wrapper #navigation_menu {
    display: block;
  }
}

@media (min-width: 1024px) {
  .header_wrapper .links {
    display: flex;
    justify-content: space-between;
  }
  .header_wrapper #navigation_menu {
    display: none;
  }
}
</style>
