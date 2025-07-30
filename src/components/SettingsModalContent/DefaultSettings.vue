<template>
  <div class="default-settings">
    <div class="flex items-center justify-between">
      <span class="text-[1.8rem] font-medium">Sound</span>
      <input type="checkbox" v-model="soundEnabled" />
    </div>
    
    <div class="flex items-center justify-between mt-4">
      <span class="text-[1.8rem] font-medium">Animations</span>
      <input type="checkbox" v-model="animationsEnabled" />
    </div>
    
    <div class="flex items-center justify-between mt-4">
      <span class="text-[1.8rem] font-medium">Auto Save</span>
      <input type="checkbox" v-model="autoSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const soundEnabled = ref(true)
const animationsEnabled = ref(true)
const autoSave = ref(true)
</script>

<style scoped>
.default-settings {
  padding: 1rem;
  color: white;
}
</style>