<script setup lang="ts">
    import * as basicStore from '../../store/basicStrategyStore';
    import HandTotal from '../../components/HandTotal.vue';

    provide('gameStore', basicStore)
</script>

<template>
    <HandTotal v-bind="$attrs"/>
</template>