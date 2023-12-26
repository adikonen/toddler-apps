<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, toRefs, ref, watch } from 'vue'
import { useMainStore } from '@/domain/animal-swipe/stores'
import { useForceLandscape } from '@/composables/screen'
import { useBgImage } from '@/composables/background'
import { useOutlineTextColor } from '@/composables/color'
import { twMerge } from 'tailwind-merge'
import { useVoice } from '@/composables/voice'
import { useLocaleStore } from '@/stores/locale'
interface ShowView {
  id?: number | string
  category_id: number | string
}

const props = defineProps<ShowView>()
const { category_id } = toRefs(props)

const store = useMainStore()
const localeStore = useLocaleStore()

const image = computed(() => store.animal?.image)
const sound = computed(() => store.animal?.sound)

const audio = ref(undefined as unknown as HTMLAudioElement)

const play = () => {
  voice.speak(store.animal?.getDetail().name)
  audio.value.src = sound.value || ''
  setTimeout(() => {
    audio.value.play()
  }, 300)
}

const setNext = () => {
  store.setIndexToNext()
  play()
}
const setPrev = () => {
  store.setIndexToPrev()
  play()
}

const voice = reactive(useVoice())
const forceLandscape = useForceLandscape()
const bgImage = useBgImage(image)
const outlineText = useOutlineTextColor('#444', 1.5)

onMounted(() => {
  voice.setupVoices()
  store.fillAnimals(Number(category_id.value)).then(play)
})

onBeforeUnmount(() => {
  store.$reset()
  voice.stop()
})

// if locale changed, refill data from idb
watch(
  () => localeStore.activeLocaleCode,
  () => {
    console.log(store.animal)
    store.fillAnimals(Number(category_id.value)).then(() => {
      voice.speak(store.animal?.getDetail().name)
    })
  }
)
</script>

<template>
  <audio ref="audio">
    <!--  sound not working while using v-bind -->
    <source type="video/webm" />
  </audio>

  <div
    :class="
      twMerge(
        'w-screen h-screen brightness-90 duration-300 transition ease-in-out flex flex-col justify-between',
        forceLandscape
      )
    "
    :style="bgImage"
  >
    <div class="flex justify-between items-start text-white" :style="outlineText">
      <RouterLink
        :to="{ name: 'animal-swipe' }"
        class="inline-flex items-center text-white font-bold gap-1"
      >
        <VIcon icon="mdi:arrow-left-bold-circle" width="30" class="drop-shadow"></VIcon>
        <p class="text-lg">Back</p>
      </RouterLink>
      <ul class="bg-gray-700 p-3 rounded-bl-md flex gap-4 shadow">
        <li class="rounded-full p-1 bg-gray-600" @click="voice.speak(store.animal?.getDetail().name)">
          <VIcon icon="heroicons:speaker-wave-solid"></VIcon>
        </li>
        <li
          class="rounded-full p-1 bg-gray-600 flex items-center"
          @click="localeStore.setNextLocale"
        >
          <img width="20" :src="localeStore.activeLocale?.image" alt="" />
        </li>
      </ul>
    </div>
    <div class="text-white flex justify-between mx-2" :style="outlineText">
      <span class="rounded-full bg-black">
        <VIcon icon="mdi:chevron-left-circle" width="50" @click="setNext"></VIcon>
      </span>
      <span class="rounded-full bg-black">
        <VIcon icon="mdi:chevron-right-circle" width="50" @click="setPrev"></VIcon>
      </span>
    </div>
    <div class="self-center relative bottom-8 flex gap-8 text-white items-center">
      <h1 class="text-3xl self-centerfont-bold font-poppins" :style="outlineText">
        {{ store.animal?.getDetail().name }}
      </h1>
    </div>
  </div>
</template>
