<script setup lang="ts">
    import * as indexStore from '../../store/store';
    import HandTotal from '../../components/HandTotal.vue';

    provide('gameStore', indexStore)
</script>

<template>
    <HandTotal v-bind="$attrs" />
</template>