<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import { useMainStore } from '@/domain/animal-swipe/stores';
import { onMounted } from 'vue';
import VCard from '@/components/VCard.vue'
const store = useMainStore()

onMounted(async () => {
  await store.fillCategories()
})
</script>

<template>
  <DefaultLayout>
    <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
      <template v-for="item in store.categories" :key="item.id">
        <RouterLink
          :to="{name: 'animal-swipe.show', params: { category_id: item.id, id:1 }}"
        >
          <VCard>
            <img :src="item.image" :alt="item.name">
            <h4 class="text-xl font-semibold text-center">
              {{ item.name }}
            </h4>
          </VCard>
        </RouterLink>
      </template>
    </div>
  </DefaultLayout>
</template>
