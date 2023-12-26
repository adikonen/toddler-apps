<script setup lang="ts">
import { computed, onMounted, reactive, watch, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useMainStore } from '../stores'
import { useVoice } from '@/composables/voice'
import { usePaginate } from '@/composables/paginate'
import ChevronButtons from '@/components/ChevronButtons.vue'
import LocaleToggler from '@/components/LocaleToggler.vue'

interface ShowView {
  category_type: string
}

const props = defineProps<ShowView>()

const store = useMainStore()
const voice = reactive(useVoice())


const { width } = useWindowSize()

const totalPerData = ref(6)
const cardPaginate = reactive(usePaginate(store.abcs, totalPerData))

onMounted(async () => {
  await store.fillCategories()
  await store.fillDictionaryData(props.category_type)
  store.initAbc()
  cardPaginate.source = store.abcs
  totalPerData.value = width.value > 576 ? store.abcs.length : 6
  voice.setupVoices()
})

const speak = () => {
  return voice.speak(store.dictionary?.getDetail().name)
}

watch(() => store.dictionary, () => speak())
watch(width, (newv) => {
  // reset
  cardPaginate.current = 0
  totalPerData.value = newv > 576 ? store.abcs.length : 6
}) 
</script>

<template>
  <div class="">
    <div class="shadow">
      <div class="p-3 flex justify-between max-w-7xl mx-auto">
        <div>
          <RouterLink
            :to="{ name: 'dictionary' }"
            class="mx-auto max-w-7xl text-lg font-semibold flex gap-1 items-center"
          >
            <VIcon icon="mdi:arrow-left"></VIcon>
            Back
          </RouterLink>
        </div>
        <div>
          <LocaleToggler @change-locale="speak()"/>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 p-3 gap-4 max-w-7xl mx-auto">
      <div>
        <VCard class="relative">
          <img :src="store.dictionary?.image" class="duration-400 mx-auto h-52" />
          <h3 class="font-poppins text-center text-lg mt-2">
            {{ store.dictionary?.getDetail().name }}
          </h3> 
          <ChevronButtons
            class="absolute w-[105%] left-[-1rem] top-[40%]"
            :width="40"
            @next="store.nextAbcIndex()"
            @prev="store.prevAbcIndex()"
            :show="store.dictionaries?.length > 1"
          />
        </VCard>
      </div>
      <div class="relative h-32 sm:h-fit">
        <div class="grid grid-cols-3 gap-3">
          <template v-for="abc in cardPaginate?.active">
            <VCard
              @click="store.setAbc(abc)"
              :class="['text-xl', { 'bg-gray-700 text-white': abc === store.abc }]"
            >
              {{ abc }}
            </VCard>
            
          </template>
        </div>
        <ChevronButtons
            class="absolute bottom-[-2.6rem] w-[90%] mx-auto left-0 right-0"
            :width="30"
            @next="cardPaginate.toNext()"
            @prev="cardPaginate.toPrev()"
            :show="width <= 576"
          />
      </div>
    </div>
  </div>
</template>
