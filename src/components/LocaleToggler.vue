<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import { watch } from 'vue'
const localeStore = useLocaleStore()

const emit = defineEmits(['changeLocale'])

watch(
  () => localeStore.activeLocaleCode,
  (newv) => {
    emit('changeLocale', newv)
  }
)
</script>

<template>
  <div class="rounded-full p-2 bg-gray-600 flex items-center" @click="localeStore.setNextLocale">
    <img width="20" :src="localeStore.activeLocale?.image" alt="" />
  </div>
</template>
