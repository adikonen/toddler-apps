<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useLocaleStore } from './stores/locale'
import { supabase } from './utils/supabase';

const localeStore = useLocaleStore()

onBeforeMount(() => {
  supabase.from('dictionaries').select().then((d) => console.log(d.data, d.error))
  localeStore.fillLocales()
})
</script>

<template>
  <RouterView></RouterView>
</template>
