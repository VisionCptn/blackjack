<script setup lang="ts">
import { state } from '../store'
import { ref } from 'vue'
import SettingsModal from './SettingsModal.vue'

const showSettings = ref(false)

function toggleSound() {
  state.isMuted = !state.isMuted
  localStorage.setItem('isMuted', state.isMuted.toString())
}
</script>

<template>
  <header>
    <!-- <a
      class="github"
      aria-label="Source on GitHub"
      href="https://github.com/kevinleedrum/vlackjack"
    >
      <svg role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    </a> -->
    <a @click="showSettings = true" style="cursor:pointer;">
      <svg fill="currentColor" height="24px" version="1.1" viewBox="0 0 48 48" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M26,48h-4c-1.654,0-3-1.346-3-3v-3.724c-1.28-0.37-2.512-0.881-3.681-1.527l-2.634,2.635     c-1.134,1.134-3.109,1.132-4.243,0l-2.829-2.828c-0.567-0.566-0.879-1.32-0.879-2.121s0.312-1.555,0.879-2.121l2.635-2.636     c-0.645-1.166-1.156-2.398-1.525-3.679H3c-1.654,0-3-1.346-3-3v-4c0-0.802,0.312-1.555,0.878-2.121     c0.567-0.566,1.32-0.879,2.122-0.879h3.724c0.37-1.278,0.88-2.511,1.526-3.679l-2.634-2.635c-1.17-1.17-1.17-3.072,0-4.242     l2.828-2.829c1.133-1.132,3.109-1.134,4.243,0l2.635,2.635C16.49,7.604,17.722,7.093,19,6.724V3c0-1.654,1.346-3,3-3h4     c1.654,0,3,1.346,3,3v3.724c1.28,0.37,2.512,0.881,3.678,1.525l2.635-2.635c1.134-1.132,3.109-1.134,4.243,0l2.829,2.828     c0.567,0.566,0.879,1.32,0.879,2.121s-0.312,1.555-0.879,2.121l-2.634,2.635c0.646,1.168,1.157,2.4,1.526,3.68H45     c1.654,0,3,1.346,3,3v4c0,0.802-0.312,1.555-0.878,2.121s-1.32,0.879-2.122,0.879h-3.724c-0.37,1.28-0.881,2.513-1.526,3.68     l2.634,2.635c1.17,1.17,1.17,3.072,0,4.242l-2.828,2.829c-1.134,1.133-3.109,1.133-4.243,0L32.68,39.75     c-1.168,0.646-2.401,1.156-3.679,1.526V45C29,46.654,27.655,48,26,48z M15.157,37.498c0.179,0,0.36,0.048,0.521,0.146     c1.416,0.866,2.949,1.502,4.557,1.891C20.684,39.644,21,40.045,21,40.507V45c0,0.552,0.449,1,1,1h4c0.551,0,1-0.448,1-1v-4.493     c0-0.462,0.316-0.863,0.765-0.972c1.606-0.389,3.139-1.023,4.556-1.89c0.396-0.241,0.902-0.18,1.229,0.146l3.178,3.179     c0.375,0.374,1.039,0.376,1.415,0l2.828-2.829c0.39-0.39,0.39-1.024,0-1.414l-3.179-3.179c-0.327-0.326-0.387-0.835-0.146-1.229     c0.865-1.414,1.5-2.947,1.889-4.556c0.108-0.449,0.51-0.766,0.972-0.766H45c0.267,0,0.519-0.104,0.708-0.293     C45.896,26.518,46,26.267,46,25.999v-4c0-0.552-0.449-1-1-1h-4.493c-0.462,0-0.864-0.316-0.972-0.766     c-0.388-1.607-1.023-3.14-1.889-4.556c-0.241-0.394-0.181-0.901,0.146-1.229l3.179-3.179c0.186-0.187,0.293-0.444,0.293-0.707     s-0.107-0.521-0.293-0.707l-2.829-2.828c-0.378-0.377-1.037-0.377-1.415,0l-3.179,3.179c-0.326,0.328-0.833,0.389-1.229,0.146     c-1.413-0.864-2.945-1.5-4.554-1.889C27.317,8.356,27,7.955,27,7.493V3c0-0.552-0.449-1-1-1h-4c-0.551,0-1,0.448-1,1v4.493     c0,0.462-0.316,0.863-0.765,0.972c-1.606,0.388-3.139,1.023-4.556,1.889c-0.395,0.241-0.902,0.181-1.228-0.146l-3.179-3.179     c-0.378-0.377-1.037-0.377-1.415,0L7.03,9.857c-0.39,0.39-0.39,1.024,0,1.414l3.179,3.179c0.327,0.326,0.387,0.835,0.146,1.229     c-0.866,1.416-1.501,2.949-1.889,4.555c-0.108,0.449-0.51,0.766-0.972,0.766H3c-0.267,0-0.519,0.104-0.708,0.293     C2.104,21.48,2,21.731,2,21.999v4c0,0.552,0.449,1,1,1h4.493c0.462,0,0.864,0.316,0.972,0.766     c0.389,1.608,1.024,3.141,1.889,4.555c0.241,0.394,0.181,0.901-0.146,1.229l-3.179,3.18c-0.186,0.187-0.293,0.444-0.293,0.707     s0.107,0.521,0.293,0.707l2.829,2.828c0.377,0.377,1.037,0.377,1.415,0l3.178-3.179C14.643,37.598,14.898,37.498,15.157,37.498z"/></g><g><path d="M24,34c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S29.515,34,24,34z M24,16c-4.411,0-8,3.589-8,8     s3.589,8,8,8s8-3.589,8-8S28.412,16,24,16z"/></g></g></g></svg>
    </a>
    <SettingsModal v-model:modelValue="showSettings" />
    <h1>Vl<span>a</span>ck<span>j</span>ack</h1>
    <button class="button" @click="toggleSound" aria-label="Toggle sound">
      <svg
        v-if="!state.isMuted"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        />
        <path d="M16 9a5 5 0 0 1 0 6" />
        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-volume-off"
      >
        <path d="M16 9a5 5 0 0 1 .95 2.293" />
        <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
        <path d="m2 2 20 20" />
        <path
          d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"
        />
        <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  pointer-events: none;
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
  border-radius: 50%;
  height: 40px;
  width: 40px;
  pointer-events: auto;
  opacity: 0.75;
  color: var(--color-off-white);
}
@media (hover: hover) {
  a:hover,
  button:hover {
    opacity: 1;
  }
  button:hover {
    color: var(--color-black);
  }
}

button {
  padding: 0.625rem;
  background: transparent;
}

button:focus-visible,
button:active {
  color: var(--color-black);
}

@media (min-width: 900px) {
  header {
    padding: 1rem 0;
    right: unset;
    bottom: 0;
    width: 60px;
    height: 100%;
    flex-direction: column;
    background-color: var(--color-black);
  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 32px;
    letter-spacing: 0.1rem;
    color: var(--color-white);
    text-transform: uppercase;
    font-variation-settings: 'wght' 500;
    rotate: -90deg;
    position: relative;
    margin: 0;
    clip: unset;
    height: auto;
    overflow: visible;
  }
}
</style>
