<script setup lang="ts">
interface TheNavbar {
  forceLandscape?: boolean
}

defineProps<TheNavbar>()
</script>

<template>
  <div class="bg-white p-3 shadow">
    <div class="max-w-7xl mx-auto">
      <RouterLink :to="{ name: 'home' }" class="text-lg font-semibold">Toddler Game</RouterLink>
    </div>
  </div>
</template>
