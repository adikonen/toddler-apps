<script setup lang="ts">
interface TheNavbar {
  forceLandscape?: boolean
}

defineProps<TheNavbar>()
</script>

<template>
  <div class="bg-white p-3 shadow">
    <div class="max-w-7xl mx-auto">
      <h4 class="text-lg font-semibold">Todd Game</h4>
    </div>
  </div>
</template>
