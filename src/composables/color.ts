import { computed } from "vue"

export const useColor = () => {}

/**
 * bind this in style
 */
export function useOutlineTextColor(color = '#111', size = 0.74)  {
  return computed(() => ({
    textShadow: `-${size}px -${size}px 0 ${color}, 
      ${size}px -${size}px 0 ${color}, 
      -${size}px ${size}px 0 ${color}, 
      ${size}px ${size}px 0 ${color}`
  }))
}