<script setup lang="ts">
import * as indexStore from '../../store/store';
import PlayerBank from '../../components/PlayerBank.vue';

provide('gameStore', indexStore)
</script>

<template>
    <PlayerBank />
</template>