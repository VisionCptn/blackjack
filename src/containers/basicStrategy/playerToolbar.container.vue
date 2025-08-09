<script setup lang="ts">
import * as basicStore from '../../store/basicStrategyStore';
import PlayerToolbar from '../../components/PlayerToolbar.vue';
// import CoinsContainer from './coins.container.vue';
import DealButton from '~/src/components/BasicStrategy/DealButton.vue';
import PlayerBankContainer from './playerBank.container.vue';

provide('gameStore', basicStore)
</script>

<template>
    <PlayerToolbar>
        <template #coins>
            <DealButton />
        </template>
        <template #player-bank>
            <PlayerBankContainer />
        </template>
    </PlayerToolbar>
</template>