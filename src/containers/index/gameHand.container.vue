<script setup lang="ts">
    import * as indexStore from '../../store/store';
    import GameHand from '../../components/GameHand.vue';
    import UserBet from '../../containers/index/userBet.container.vue';
    provide('gameStore', indexStore)

    defineOptions({
        inheritAttrs: false // Prevent automatic attribute inheritance
    })
</script>

<template>
    <GameHand v-bind="$attrs">
        <template #user-bet>
            <UserBet v-if="!$attrs.player.isDealer" :key="Date.now()" :class="{'opacityHalf': $attrs.isSplitHand && !$attrs.isActiveHand }" />
        </template>
    </GameHand>
</template>