<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useLocaleStore } from './stores/locale'
import { supabase } from './utils/supabase';
import { dictionaryCategoryService } from './services/dictionary-category.service';
import { localeService } from '@/services/locale.service'
import type {DictionaryCategory} from './services/dictionary-category.service' 
const localeStore = useLocaleStore()
onBeforeMount(async () => {
  localeStore.fillLocales()
})

</script>

<template>
<RouterView></RouterView>
</template>
