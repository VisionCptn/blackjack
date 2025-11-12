<script setup lang="ts">
import App from '../src/App.vue'

useHead({
  title: 'Page Not Found - Blackjack Coach',
  meta: [
    { name: 'title', content: 'Page Not Found - Blackjack Coach' }
  ]
})

const goHome = () => {
  navigateTo('/')
}
</script>

<template>
  <App>
    <div class="error-page">
      <div class="error-content">
        <h1 class="error-title">404</h1>
        <h2 class="error-subtitle">Page Not Found</h2>
        <p class="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button @click="goHome" class="home-button">
          Go Back Home
        </button>
      </div>
    </div>
  </App>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle closest-corner at top 50% right calc(50% + 160px), rgba(0,0,0,0) 0, rgba(0,0,0,.45) 98%), repeat center center url(/green_table.webp);
  padding: 2rem;
}

.error-content {
  text-align: center;
  color: white;
  max-width: 500px;
}

.error-title {
  font-size: 6rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #ff6b6b;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.error-subtitle {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.error-message {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  color: #e0e0e0;
  line-height: 1.6;
}

.home-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.home-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>