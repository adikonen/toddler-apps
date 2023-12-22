<script setup lang="ts">
import abc from '@/assets/abc.jpg'
import animals from '@/assets/animals.webp'

const data = [
  { name: 'Learn Abc', image: abc, to: 'dictionary' },
  { name: 'Learn Animals', image: animals, to: 'animal-swipe' }
]
</script>
<template>
  <DefaultLayout>
    <h2 class="text-xl font-poppins font-bold text-center my-2">Select Menu</h2>
    <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 place-content-center">
      <VCard v-for="item in data" class="relative pb-5">
        <RouterLink :to="{ name: item.to }">
          <img :src="item.image" :alt="item.name" />
          <div class="text-center absolute bottom-3 font-medium left-0 w-full text-lg">
            {{ item.name }}
          </div>
        </RouterLink>
      </VCard>
    </div>
  </DefaultLayout>
</template>
