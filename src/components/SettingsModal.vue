<template>
  <!-- <Teleport to="body">
    <div v-if="modelValue" class="settings-modal-overlay">
      <div class="settings-modal-content">
        <button @click="$emit('update:modelValue', false)" class="settings-modal-close">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="settings-modal-title">Settings</h2>
        <div>
          <p>Settings go here.</p>
        </div>
      </div>
    </div>
  </Teleport> -->
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h2"
                class="flex justify-center items-center text-lg font-medium leading-6 text-gray-900 w-full"
              >
                <span class="text-[2rem]">Settings</span>
              </DialogTitle>
              <div class="flex items-center justify-between py-3">
               
                    <span class="text-[2rem] font-medium">Auto last bet?</span>
                    <Switch
                      v-model="state.autoPlaceBet"
                      :class="state.autoPlaceBet ? 'bg-green-600' : 'bg-gray-200'"
                      class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
                      key="placebet"
                    >
                      <span class="sr-only">Auto last bet?</span>
                      <span
                        :class="state.autoPlaceBet ? 'translate-x-7' : 'translate-x-1'"
                        class="inline-block h-5 w-5 transform rounded-full bg-white transition"
                      ></span>
                    </Switch>
                  </div>
                  <div class="flex items-center justify-between py-3">
                    <span class="text-[2rem] font-medium">Sound?</span>
                    <Switch
                      v-model="state.isMuted"
                      :class="!state.isMuted ? 'bg-green-600' : 'bg-gray-200'"
                      class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none"
                      key="sound"
                    >
                      <span class="sr-only">Sound</span>
                      <span
                        :class="!state.isMuted ? 'translate-x-7' : 'translate-x-1'"
                        class="inline-block h-5 w-5 transform rounded-full bg-white transition"
                      ></span>
                    </Switch>
                  </div>
                  <div class="flex items-center justify-between py-3">
                    <span class="text-base text-[2rem] font-medium">Deck size</span>
                    <div class="flex gap-2">
                      <button v-for="n in [1,2,3,4,5,6,8]" :key="n" type="button"
                        class="px-3 text-2xl py-1 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        :class="{ 'bg-blue-600 text-green-600': newDeckSize === n }"
                        @click="newDeckSize = n"
                      >
                        {{ n }}
                      </button>
                    </div>
                  </div>
                  <button @click="restartGame" :disabled="state.shoeSize === newDeckSize" class="button mx-auto block dialogButton">Restart game</button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { state, resetBank } from '../store/store'
  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue'])
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

  function closeModal() {
    emit('update:modelValue', false);
  }

  function restartGame() {
    state.shoeSize = newDeckSize.value;
    state.isGameOver = true
    // resetBank();
  }

   const newDeckSize = ref(state.shoeSize)
</script>

<style scoped>
  .dialogButton {
    background-color: var(--color-green-500);
    color: var(--color-white);
    font-size: 2rem;
  }
  button.dialogButton.button:focus-visible:not(:disabled) {
    outline-offset: 0.25rem;
    outline: 2px solid var(--color-white);
  }

  button.dialogButton.button:active:not(:disabled) {
    transform: translateY(0.1rem);
    /* background-color: var(--color-green-700); */
  }

  button.dialogButton.button:hover:not(:disabled) {
    /* transform: translateY(0.1rem); */
    background-color: var(--color-green-700);
  }

/* @media (hover: hover) {
  button.button:hover:not(:disabled) {
    background-color: rgba(from var(--color-off-white) r g b / 1);
    transform: translateY(-0.1rem);
  }
} */
</style>