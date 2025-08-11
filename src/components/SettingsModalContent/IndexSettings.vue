              
<script setup>

    import { globalState, closeModal } from '../../store/globalStore';

/////
    import { state } from '../../store/store';
    function close() {
    // state.shoeSize = newDeckSize.value;
    // state.isGameOver = true
    closeModal();
    // resetBank();
  }

    watch(() => state.autoPlaceBet, (newVal) => {
        localStorage.setItem('autoPlaceBet', JSON.stringify(newVal))
    })

    watch(() => globalState.isMuted, (newVal) => {
        localStorage.setItem('isMuted', JSON.stringify(newVal))
    })

    watch(() => state.allowInsurance, (newVal) => {
        localStorage.setItem('allowInsurance', JSON.stringify(newVal))
    })

    watch(() => state.shoeSize, (newVal) => {
        localStorage.setItem('shoeSize', JSON.stringify(newVal))
    })
    watch(() => state.splitByValue, (newVal) => {
        localStorage.setItem('index.splitByValue', JSON.stringify(newVal))
    })
  
</script>

<template v-slot:default>
    <v-card-text class="!pt-0">
        <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Auto last bet</span>
            <v-switch
                v-model="state.autoPlaceBet"
                color="var(--color-red)"
                key="lastbet"
            ></v-switch>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Muted</span>
            <v-switch
                v-model="globalState.isMuted"
                color="var(--color-red)"
                key="muted"
            ></v-switch>
        </div>

         <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Insurance</span>
            <v-switch
                v-model="state.allowInsurance"
                color="var(--color-green)"
                key="insurance"
            ></v-switch>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Split by value</span>
            <v-switch
                v-model="state.splitByValue"
                color="var(--color-green)"
                key="splitByValue"
            ></v-switch>
        </div>
        
        <v-divider class="border-opacity-50" color="success"></v-divider>
        <div class="flex items-center justify-between">
        <span class="text-[1.8rem] font-medium">Number of decks:</span>
        <div class="flex gap-2">
            <button v-for="n in [1,2,3,4,5,6,8]" :key="n" type="button"
                    class="toggleButton text-[2rem] px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    :class="{ 'bg-blue-600 text-green-600': state.shoeSize === n }"
                    @click="state.shoeSize = n"
                >
                {{ n }}
            </button>
        </div>
    </div>

<!-- fafasf -->

    <v-divider class="mt-2"></v-divider>
        <!-- Default actions slot -->
        <v-card-actions class="mt-[24px] font mb-[12px] !p-0 d-flex justify-end">
            <v-btn
                class="text-none !text-[1.8rem]"
                color="#008000"
                size="x-large"
                text="Close"
                variant="flat"
                @click="close"
        ></v-btn>
    </v-card-actions>
    </v-card-text>
</template>



<style>

    .slider .v-slider__container {
        margin-left: 20px!important;
    }

    /* Add to your style block */
   
</style>

<style scoped>
.text_wrapper{
    font-size: 1.3rem;
    min-height: 4rem;
    margin-bottom: 1.5rem;
}
 .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
.v-input__details{
    display: none;
}
</style>