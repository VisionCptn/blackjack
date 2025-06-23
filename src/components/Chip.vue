<template>
    <div class="chip-container" @click="handleClick">
  <svg
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 51"
    :style="{ '--color-chip': color }"
    role="img"
    aria-label="Chip"
  >
    <circle cx="26" cy="26" r="25" fill="var(--color-chip)" />
    <circle
      cx="26"
      cy="26"
      r="22"
      stroke="var(--color-white)"
      stroke-width="5"
      stroke-dasharray="9 14"
      fill="none"
    />
    <circle
      cx="26"
      cy="26"
      r="15"
      stroke="var(--color-white)"
      stroke-width="2"
      stroke-dasharray="4"
      fill="none"
    />
  </svg>
   <span v-if="value" class="chip-number">{{value}}</span>
   </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: '#E8E8E8', // Default gray color
  },
  width: {
    type: [String, Number],
    default: 50, // Default width
  },
  height: {
    type: [String, Number],
    default: 50, // Default height
  },
  value: {
    type: Number,
    default: 1, // Default value of the chip
  },
  onClick: {
    type: Function,
    required: false, // Optional onClick function
  },
});

function handleClick() {
  if (props.onClick) {
    props.onClick(); // Call the onClick function if provided
  }
//   emit('click', event);
//   console.log('click');
}
</script>

<style scoped>
    svg {
    cursor: pointer;
    }
    .chip-container {
        position: relative;
        display: inline-block;
        width: 5rem;
        height: 5rem;
    }
    .chip-number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem; /* Adjust font size as needed */
        font-weight: bold;
        color: white; /* Adjust color to match your design */
        pointer-events: none; /* Prevent interaction with the number */
    }
</style>