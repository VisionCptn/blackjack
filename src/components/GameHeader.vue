<script setup lang="ts">
import { state } from '../store/store'
import { ref } from 'vue'
import SettingsModal from './SettingsModal.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const showSettings = ref(false)
import DropdownMenu from './DropdownMenu.vue'

</script>

<template>
  <header>
    <div class="header_wrapper">
    <div class="logoWrapper">
        <svg aria-hidden="true">
          <use href="#logo"/>
        </svg>
    </div>
    <SettingsModal v-model:modelValue="showSettings" />
    <nav class="links">
      <NuxtLink to="/" class="nav-link" title="Home">
        <span class="headerTextLink">Play Blackjack</span>
      </NuxtLink>
      <!-- <NuxtLink to="/count" class="nav-link" title="Card Counting Guide">
        <span class="headerTextLink">Deck Count</span>
      </NuxtLink> -->
    </nav>
    <div id="navigation_menu">
      <DropdownMenu />
    </div>
    </div>
    <div class="relative">
      <button @click="showSettings = true" class="settingsBtn" style="cursor:pointer;">
        <svg fill="currentColor" height="24px" version="1.1" viewBox="0 0 48 48" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M26,48h-4c-1.654,0-3-1.346-3-3v-3.724c-1.28-0.37-2.512-0.881-3.681-1.527l-2.634,2.635     c-1.134,1.134-3.109,1.132-4.243,0l-2.829-2.828c-0.567-0.566-0.879-1.32-0.879-2.121s0.312-1.555,0.879-2.121l2.635-2.636     c-0.645-1.166-1.156-2.398-1.525-3.679H3c-1.654,0-3-1.346-3-3v-4c0-0.802,0.312-1.555,0.878-2.121     c0.567-0.566,1.32-0.879,2.122-0.879h3.724c0.37-1.278,0.88-2.511,1.526-3.679l-2.634-2.635c-1.17-1.17-1.17-3.072,0-4.242     l2.828-2.829c1.133-1.132,3.109-1.134,4.243,0l2.635,2.635C16.49,7.604,17.722,7.093,19,6.724V3c0-1.654,1.346-3,3-3h4     c1.654,0,3,1.346,3,3v3.724c1.28,0.37,2.512,0.881,3.678,1.525l2.635-2.635c1.134-1.132,3.109-1.134,4.243,0l2.829,2.828     c0.567,0.566,0.879,1.32,0.879,2.121s-0.312,1.555-0.879,2.121l-2.634,2.635c0.646,1.168,1.157,2.4,1.526,3.68H45     c1.654,0,3,1.346,3,3v4c0,0.802-0.312,1.555-0.878,2.121s-1.32,0.879-2.122,0.879h-3.724c-0.37,1.28-0.881,2.513-1.526,3.68     l2.634,2.635c1.17,1.17,1.17,3.072,0,4.242l-2.828,2.829c-1.134,1.133-3.109,1.133-4.243,0L32.68,39.75     c-1.168,0.646-2.401,1.156-3.679,1.526V45C29,46.654,27.655,48,26,48z M15.157,37.498c0.179,0,0.36,0.048,0.521,0.146     c1.416,0.866,2.949,1.502,4.557,1.891C20.684,39.644,21,40.045,21,40.507V45c0,0.552,0.449,1,1,1h4c0.551,0,1-0.448,1-1v-4.493     c0-0.462,0.316-0.863,0.765-0.972c1.606-0.389,3.139-1.023,4.556-1.89c0.396-0.241,0.902-0.18,1.229,0.146l3.178,3.179     c0.375,0.374,1.039,0.376,1.415,0l2.828-2.829c0.39-0.39,0.39-1.024,0-1.414l-3.179-3.179c-0.327-0.326-0.387-0.835-0.146-1.229     c0.865-1.414,1.5-2.947,1.889-4.556c0.108-0.449,0.51-0.766,0.972-0.766H45c0.267,0,0.519-0.104,0.708-0.293     C45.896,26.518,46,26.267,46,25.999v-4c0-0.552-0.449-1-1-1h-4.493c-0.462,0-0.864-0.316-0.972-0.766     c-0.388-1.607-1.023-3.14-1.889-4.556c-0.241-0.394-0.181-0.901,0.146-1.229l3.179-3.179c0.186-0.187,0.293-0.444,0.293-0.707     s-0.107-0.521-0.293-0.707l-2.829-2.828c-0.378-0.377-1.037-0.377-1.415,0l-3.179,3.179c-0.326,0.328-0.833,0.389-1.229,0.146     c-1.413-0.864-2.945-1.5-4.554-1.889C27.317,8.356,27,7.955,27,7.493V3c0-0.552-0.449-1-1-1h-4c-0.551,0-1,0.448-1,1v4.493     c0,0.462-0.316,0.863-0.765,0.972c-1.606,0.388-3.139,1.023-4.556,1.889c-0.395,0.241-0.902,0.181-1.228-0.146l-3.179-3.179     c-0.378-0.377-1.037-0.377-1.415,0L7.03,9.857c-0.39,0.39-0.39,1.024,0,1.414l3.179,3.179c0.327,0.326,0.387,0.835,0.146,1.229     c-0.866,1.416-1.501,2.949-1.889,4.555c-0.108,0.449-0.51,0.766-0.972,0.766H3c-0.267,0-0.519,0.104-0.708,0.293     C2.104,21.48,2,21.731,2,21.999v4c0,0.552,0.449,1,1,1h4.493c0.462,0,0.864,0.316,0.972,0.766     c0.389,1.608,1.024,3.141,1.889,4.555c0.241,0.394,0.181,0.901-0.146,1.229l-3.179,3.18c-0.186,0.187-0.293,0.444-0.293,0.707     s0.107,0.521,0.293,0.707l2.829,2.828c0.377,0.377,1.037,0.377,1.415,0l3.178-3.179C14.643,37.598,14.898,37.498,15.157,37.498z"/></g><g><path d="M24,34c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S29.515,34,24,34z M24,16c-4.411,0-8,3.589-8,8     s3.589,8,8,8s8-3.589,8-8S28.412,16,24,16z"/></g></g></g></svg>
      </button>
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
  font-size: 1.5rem;
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
a,
button {
  color: var(--color-off-white);
  opacity: 0.7;
}

 .settingsBtn {
  position: absolute;
  top: 10px;
  left: 10px;
 }

  .settingsBtn:hover {
    opacity: 1;
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
