              
    <template v-slot:default>
        <v-card-text class="!pt-0">
        <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Muted</span>
            <v-switch
                v-model="globalState.isMuted"
                color="var(--color-red)"
                key="sound"
            ></v-switch>
        </div>

        <v-divider class="border-opacity-50" color="success"></v-divider>

        <v-slider
            v-model="countState.dealSpeed"
            :color="sliderColor"
            :track-color="trackColor"
            :max="150"
            tick-size="5"
            step="0.1"
            class="!m-0 slider"
        >
            <template #label>
                <span class="text-[1.8rem] font-medium">Deal speed</span>
            </template>
        </v-slider>
        <p class="text_wrapper">Deal speed for one card -
            <span v-if="countState.dealSpeed === 0"><strong>off</strong></span>
            <span v-else><strong>{{ countState.dealSpeed }}</strong>sec</span>.
            <transition name="fade">
                <span v-if="countState.dealSpeed > 0">
                    If you are able to count one deck under <strong>30</strong> sec, you should be good to go. Current speed is approximately <strong>{{ (countState.dealSpeed / 52).toFixed(1) }}</strong> sec per card.
                </span>
            </transition>
        </p>

        <div class="flex items-center justify-between">
            <span class="text-[1.8rem] font-medium">Number of decks:</span>
            <div class="flex gap-2">
                <button v-for="n in [1,2,3,4,5,6,8]" :key="n" type="button"
                        class="toggleButton text-[1.7rem] px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        :class="{ 'bg-blue-600 text-green-600': countState.countDeckCount === n }"
                        @click="countState.countDeckCount = n"
                    >
                    {{ n }}
                </button>
            </div>
        </div>
        <v-divider class="mt-2"></v-divider>
            <!-- Default actions slot -->
            <v-card-actions class="mt-[24px] font mb-[12px] !p-0 d-flex justify-end">
                <v-btn
                    class="text-none !text-[1.8rem]"
                    color="#008000"
                    size="x-large"
                    text="Start"
                    variant="flat"
                    @click="startGame"
            ></v-btn>
        </v-card-actions>
        </v-card-text>
    </template>

<script setup>
import { countState, startCountdown, resetState }  from '../../store/countStore';
import { globalState } from '../../store/globalStore';
import { closeModal } from '../../store/globalStore';
import { computed } from 'vue';

// Dynamic slider colors based on deal speed
const sliderColor = computed(() => {
  if (countState.dealSpeed <= 30) return '#008000'; // Green
  if (countState.dealSpeed <= 60) return '#808080'; // Grey  
  return '#ff0000'; // Red
});

const trackColor = computed(() => {
  if (countState.dealSpeed <= 30) return '#008800'; // Dark Green
  if (countState.dealSpeed <= 60) return '#606060'; // Dark Grey
  return '#cc0000'; // Dark Red
});

watch(() => globalState.isMuted, (newVal) => {
    localStorage.setItem('isMuted', JSON.stringify(newVal))
});
watch(() => countState.dealSpeed, (newVal) => {
    localStorage.setItem('dealSpeed', JSON.stringify(newVal))
});
watch(() => countState.countDeckCount, (newVal) => {
    localStorage.setItem('countDeckCount', JSON.stringify(newVal))
});

async function startGame() {
    await resetState();
    closeModal()
    await nextTick()
    countState.showTitleScreen = false
    startCountdown()
}
</script>

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
</style>