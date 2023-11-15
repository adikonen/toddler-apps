import { useLocaleStore } from '@/stores/locale'
import { useSpeechSynthesis } from '@vueuse/core/index.cjs'
import { ref, watch } from 'vue'

export function useVoice(vpitch = 1, vrate = 1) {
  const localeStore = useLocaleStore()

  const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
  const text = ref('')

  const pitch = ref(vpitch)
  const rate = ref(vrate)

  const speech = useSpeechSynthesis(text, {
    voice,
    pitch,
    rate
  })

  const voices = ref<SpeechSynthesisVoice[]>([])

  let synth: SpeechSynthesis

  const fillVoice = (locale: string) => {
    voice.value = voices.value.find((item) => item.lang === locale) || voices.value[0]
  }

  const setupVoices = () => {
    // use timeout to prevent given undefined value
    setTimeout(() => {
      synth = window.speechSynthesis
      voices.value = synth.getVoices()
      fillVoice(localeStore.activeLocaleCode)
    })
  }

  const speak = (txt?: string, delay = 1) => {
    text.value = txt || ''
    setTimeout(speech.speak, delay)
  }

  const stop = () => {
    speech.stop()
  }

  watch(() => localeStore.activeLocaleCode, fillVoice)

  return {
    text,
    voices,
    voice,
    speech,
    fillVoice,
    speak,
    stop,
    setupVoices
  }
}
