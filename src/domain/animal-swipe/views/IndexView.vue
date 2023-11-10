<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useMainStore } from '@/domain/animal-swipe/stores';
import VCard from '@/components/VCard.vue'
import { imageUtil } from '@/utils/image';
import { useLocaleStore } from '@/stores/locale';

const store = useMainStore()
const localeStore = useLocaleStore()

onMounted(store.fillCategories)

watch(() => localeStore.activeLocaleCode, store.fillCategories)
</script>
<template>
  <DefaultLayout>
    <h1 class="text-2xl text-center mb-4 font-bold font-poppins mt-2">Select Categories</h1>
    <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-content-center">
      <template v-for="item in store.categories" :key="item.id">
        <RouterLink
          :to="{name: 'animal-swipe.show', params: { category_id: item.id }}"
        >
          <VCard>
            <img class="h-32 sm:h-56 mx-auto" :src="imageUtil.readBlob(item)">
            <h4 class="text-xl font-semibold text-center justify-self-end">
              {{ item.name }}
            </h4>
          </VCard>
        </RouterLink>
      </template>
    </div>
  </DefaultLayout>
</template>
