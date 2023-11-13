<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
import { useForceLandscape } from '@/composables/screen'
interface DefaultLayout {
  forceLandscape?: boolean
}

const forceClass = useForceLandscape()

defineProps<DefaultLayout>()
</script>
<template>
  <div :class="[forceLandscape ? forceClass : '']">
    <TheNavbar></TheNavbar>
    <div class="max-w-7xl mx-auto">
      <slot />
    </div>
  </div>
</template>
