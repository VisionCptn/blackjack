<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex text-[1.5rem] items-center w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white"
        >
          <!-- Navigation -->
          <!-- <svg class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true">
            <use href="#shevron-down" />
          </svg> -->
          <svg aria-hidden="true">
            <use href="#menu" />
          </svg>
          <!-- <ChevronDownIcon
            class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          /> -->
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="/"
                class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-3xl"
              >
                Play Blackjack
            </a>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="/deck-count"
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-3xl',
                ]"
              >
                Deck Count
            </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>

<style scoped>
svg{
  width: 30px;
  height: 30px;
  color: white;
  fill: white;
}
</style>