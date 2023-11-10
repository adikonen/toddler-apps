import { computed } from "vue"

/**
 * use it as class
 */
export function useForceLandscape () {
  return computed(() => (`
    portrait:-rotate-90 
    portrait:origin-top-left 
    portrait:w-[100vh] 
    portrait:h-[100vw] 
    portrait:absolute 
    portrait:top-[100%]
  `))
}