<script setup lang="ts">
import * as basicStore from '../../store/basicStrategyStore';
import PlayerBank from '../../components/PlayerBank.vue';

provide('gameStore', basicStore)
</script>

<template>
    <PlayerBank />
</template>