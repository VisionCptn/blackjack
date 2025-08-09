<script setup lang="ts">
import * as indexStore from '../../store/store';
import UserBet from '../../components/UserBet.vue';

provide('gameStore', indexStore)
</script>

<template>
    <UserBet />
</template>