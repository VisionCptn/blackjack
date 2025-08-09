<script setup lang="ts">
import * as basicStore from '../../store/basicStrategyStore';
import UserBet from '../../components/UserBet.vue';

provide('gameStore', basicStore)
</script>

<template>
    <UserBet />
</template>