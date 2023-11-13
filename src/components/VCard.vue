<script setup lang="ts">
defineProps(['header'])
</script>

<template>
  <div class="bg-white rounded p-3 shadow">
    <div v-if="header" class="border-b border-b-black mb-3">
      {{ header }}
    </div>

    <slot />

    <div class="mt-3">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
