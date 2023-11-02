<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'

const store = useLocaleStore()

store.fillLocales()

console.log(store.locales)
</script>
<template>
  <h4>Helo World</h4>
</template>
