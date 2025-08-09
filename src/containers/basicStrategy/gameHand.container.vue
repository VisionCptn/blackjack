<script setup lang="ts">
import * as basicStrategyStore from '../../store/basicStrategyStore';
import GameHand from '../../components/GameHand.vue';
import HandTotal from '../../containers/basicStrategy/handTotal.container.vue';

provide('gameStore', basicStrategyStore)

defineOptions({
    inheritAttrs: false // Prevent automatic attribute inheritance
})
</script>

<template>
    <GameHand v-bind="$attrs">
        <template #user-bet>
            <!-- default space -->
            <span v-if="!$attrs.player.isDealer" class="w-0 hidden"></span>
        </template>
        <template #hand-total>
            <HandTotal v-bind="$attrs" />
        </template>
    </GameHand>
</template>