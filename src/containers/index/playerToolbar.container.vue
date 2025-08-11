<script setup lang="ts">
import * as indexStore from '../../store/store';
import PlayerToolbar from '../../components/PlayerToolbar.vue';
import CoinsContainer from './coins.container.vue'
import PlayerBankContainer from './playerBank.container.vue';

provide('gameStore', indexStore)
</script>

<template>
    <PlayerToolbar>
        <template #coins>
            <CoinsContainer />
        </template>
        <template #player-bank>
            <PlayerBankContainer />
        </template>
    </PlayerToolbar>
</template>