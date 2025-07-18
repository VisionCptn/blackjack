<script setup lang="ts">
import App from '../src/app.vue';
</script>

<template>
    <App>

        <div class="count-guide p-8 max-w-2xl mx-auto text-white">
            <h1 class="text-3xl font-bold mb-4">Card Counting Guide</h1>
            <p class="mb-4">Learn the basics of card counting in blackjack to improve your odds. This guide covers the Hi-Lo system, the most popular and beginner-friendly method.</p>
            <h2 class="text-xl font-semibold mt-6 mb-2">Hi-Lo System</h2>
            <ul class="list-disc ml-6 mb-4">
                <li>2–6: <span class="text-green-400 font-bold">+1</span></li>
                <li>7–9: <span class="text-yellow-300 font-bold">0</span></li>
                <li>10–A: <span class="text-red-400 font-bold">-1</span></li>
            </ul>
            <h2 class="text-xl font-semibold mt-6 mb-2">How to Count</h2>
            <ol class="list-decimal ml-6 mb-4">
                <li>Start at 0 for a new deck or shoe.</li>
                <li>Add or subtract based on each card dealt using the Hi-Lo values above.</li>
                <li>The higher the count, the more high cards remain in the deck (good for the player).</li>
                <li>Adjust your bets when the count is high.</li>
            </ol>
            <h2 class="text-xl font-semibold mt-6 mb-2">Tips</h2>
            <ul class="list-disc ml-6 mb-4">
                <li>Practice keeping the count while watching games or using a deck at home.</li>
                <li>Don’t let the count affect your playing speed or behavior at the table.</li>
                <li>Remember, card counting is not illegal, but casinos may ask you to leave if you’re caught.</li>
            </ul>
        </div>
    </App>
</template>