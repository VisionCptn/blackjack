<script setup lang="ts">
    import * as indexStore from '../../store/store';
    import Coins from '../../components/Coins.vue';

    provide('gameStore', indexStore)
</script>

<template>
    <Coins />
</template>