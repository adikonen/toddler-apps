<script setup lang="ts">
defineProps(['header'])
</script>

<template>
  <div class="bg-white rounded p-3 shadow flex flex-col">
    <div v-if="header" class="border-b border-b-black">
      {{ header }}
    </div>

    <div class="my-3">
      <slot />
    </div>

    <slot name="footer"></slot>
  </div>
</template>