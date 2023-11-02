<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useLocaleStore } from './stores/locale';

const localeStore = useLocaleStore()
onBeforeMount(() => {
  localeStore.fillLocales()
})

</script>

<template>
  <RouterView></RouterView>
</template>
