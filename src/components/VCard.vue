<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div :class="twMerge(' rounded p-2 shadow')" v-bind="$attrs">
    <slot />

    <div class="mt-3">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
