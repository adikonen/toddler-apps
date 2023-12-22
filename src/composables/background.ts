import { computed, isRef, type ComputedRef, type MaybeRef } from 'vue'

/**
 * bind this with styles,
 * use URL.createObjectURL if type is blob
 */
export function useBgImage(
  source?: ComputedRef<string | undefined> | MaybeRef<string | undefined>,
  size: 'cover' | undefined = 'cover',
  withTransition = true
) {
  return computed(() => {
    const src = isRef(source) ? source.value : source
    const result = {
      backgroundImage: `url(${src})`,
      backgroundSize: size
    }

    return withTransition ? { ...result, transitionProperty: 'background-image' } : result
  })
}
