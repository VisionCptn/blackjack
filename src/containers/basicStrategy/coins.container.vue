<script setup lang="ts">
import * as basicStore from '../../store/basicStrategyStore';
import Coins from '../../components/Coins.vue';

provide('gameStore', basicStore)
</script>

<template>
    <Coins :showDealBtn="true"/>
</template>