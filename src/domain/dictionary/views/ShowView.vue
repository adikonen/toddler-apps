<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { useMainStore } from '../stores';
import { imageUtil } from '@/utils/image';
import { useVoice } from '@/composables/voice';
import { useForceLandscape } from '@/composables/screen';
import ChevronButtons from '@/components/ChevronButtons.vue';
import LocaleToggler from '@/components/LocaleToggler.vue';

interface ShowView {
  category_type: string,
}

const props = defineProps<ShowView>()

const store = useMainStore()
const voice = reactive(useVoice())
const forceLandscape = useForceLandscape()

const image = computed(() => imageUtil.readBlob(store.activeDictionary))

const handleChangeLocale = () => {
  store.resetIndex()
  store.fillDictionaryData(props.category_type)
}

onMounted(async () => {
  store.fillDictionaryData(props.category_type)
  store.activeIndex = 0
})

watch(() => store.activeDictionary, () => {
  voice.speak(store.activeDictionary.name)
})

</script>

<template>
  <div :class="forceLandscape">
    <div class="shadow p-3 flex justify-between">
      <div>
        <RouterLink :to="{ name: 'dictionary' }" class="mx-auto max-w-7xl text-lg font-semibold flex gap-1 items-center">
          <VIcon icon="mdi:arrow-left"></VIcon>
          Back
        </RouterLink>
      </div>
      <div>
        <LocaleToggler @change-locale="handleChangeLocale"/>
      </div>
    </div>
    <div class="grid grid-cols-2 p-3 gap-4 max-w-7xl mx-auto">
      <div>
        <VCard class="relative">
          <img :src="image" class="duration-400"/>
          <h3 class="font-poppins text-center text-lg mt-2">
            {{ store.activeDictionary?.name }}
          </h3>
          <ChevronButtons 
            class="absolute w-[105%] left-[-1rem] top-[40%]" 
            :width="40"
            @next="store.setDictionaryIndexToNext()"
            @prev="store.setDictionaryIndexToPrev()"
            :show="store.dictionaryData[store.activeIndex]?.dictionaries.length > 1"
          />
        </VCard>
      </div>
      <div>
        <div class="grid grid-cols-3 gap-3">
          <template v-for="(alphabet, index) in store.alphabets">
            <VCard @click="store.setActiveIndex(index)" :class="{'bg-gray-700 text-white': index === store.activeIndex}">
              {{ alphabet }}
            </VCard>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
