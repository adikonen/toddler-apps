import { ref, unref, computed, type MaybeRef, isRef, type Ref, watch } from "vue"

export const usePaginate = <T>(resource: MaybeRef<T>, totalPerData: MaybeRef<number>) => {
  const current = ref(0)
  const source = ref(isRef(resource) ? resource.value : resource) as Ref<T>

  const toNext = () => {
    let next = current.value + 1
    if (next >= data.value.length) {
      next = 0
    }
    current.value = next
  }
  
  const toPrev = () => {
    let prev = current.value - 1
    if (prev < 0) {
      prev = data.value.length - 1
    }
    current.value = prev
  }

  const paginate = () => {
    const perDataLimit = isRef(totalPerData) ? totalPerData.value : totalPerData
    const v = source.value
    
    const result: T[] = []
    let inner: any = []

    let iteration = 0
    
    if (! Array.isArray(v)) {
      return []
    }

    v.forEach((item) => {
      iteration++
      
      inner.push(item)

      if (iteration === perDataLimit) {
        iteration = 0
        result.push(inner)
        inner = []
      }
    })

    if (inner.length > 0) {
      result.push(inner)
      inner = []
    }

    return result
  }

  const data = computed(() => paginate())

  const active = computed(() => {
    return data.value[current.value]
  })
  
  watch(source, (newv) => {
    if (!Array.isArray(newv)) {
      source.value = [] as T
    }
  })

  return {
    current,
    source,
    toNext,
    toPrev,
    data,
    active
  }
}
