<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainStore } from '../stores';
import { imageUtil } from '@/utils/image';
import { useTranslateDictionaryCategoryType } from '@/composables/locale';

const store = useMainStore()
const ttype = (txt: string) => useTranslateDictionaryCategoryType(txt)

onMounted(() => {
  store.fillCategories()
})
</script>

<template>
  <DefaultLayout>
    <h1 class="text-2xl text-center mb-4 font-bold font-poppins mt-2">Select Categories</h1>
    <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-content-center">
      <template v-for="category in store.categories" :key="category.id">
        <RouterLink :to="{ name: 'dictionary.show', params: { category_type: category.name } }">
          <VCard>
            <img class="h-32 sm:h-56 mx-auto" :src="imageUtil.readBlob(category)" />
            <h4 class="text-xl font-semibold text-center justify-self-end capitalize">
              {{ ttype(category.name).value }}
            </h4>
          </VCard>
        </RouterLink>
      </template>
    </div>
  </DefaultLayout>
</template>
