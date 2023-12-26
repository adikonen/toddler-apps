<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '../stores'
import { useTranslateDictionaryCategoryType } from '@/composables/locale'
import type { useLocaleStore } from '@/stores/locale';

const store = useMainStore()
const ttype = (txt: string) => useTranslateDictionaryCategoryType(txt)

onMounted(() => {
  store.fillCategories()
})
</script>

<template>
  <DefaultLayout>
    <RouterLink
      :to="{ name: 'home' }"
      class="text-lg font-semibold mt-2 inline-flex gap-1 items-center"
    >
      <VIcon icon="mdi:arrow-left"></VIcon>
      Back
    </RouterLink>
    <h1 class="text-2xl text-center mb-4 font-bold font-poppins">Select Categories</h1>
    <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-content-center">
      <template v-for="category in store.categories" :key="category.id">
        <RouterLink :to="{ name: 'dictionary.show', params: { category_type: category.type } }">
          <VCard>
            <img class="h-32 sm:h-56 mx-auto" :src="category.image" />
            <h4 class="text-xl font-semibold text-center justify-self-end capitalize">
              {{ category.type }}
            </h4>
          </VCard>
        </RouterLink>
      </template>
    </div>
  </DefaultLayout>
</template>
