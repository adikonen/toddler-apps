<script setup lang="ts">
import { toRefs } from 'vue';
import { twMerge } from 'tailwind-merge';
import { useOutlineTextColor } from '@/composables/color';

interface VChevrons {
  width?: number,
  color?: string,
  size?: number,
  chevClass?: string,
  show?: boolean
}

const props = withDefaults(defineProps<VChevrons>(), {
  width: 50,
  color: '#111',
  size: 0.8,
  show: true
})

defineEmits(['next', 'prev'])

const { width, color, size, chevClass, show } = toRefs(props)

const outlineText = useOutlineTextColor(color.value, size.value)
</script>

<template>
<div class="text-white flex justify-between mx-2" :style="outlineText" v-show="show">
  <span :class="twMerge('rounded-full bg-black', chevClass)">
    <VIcon icon="mdi:chevron-left-circle" :width="width" @click="$emit('prev')"></VIcon>
  </span>
  <span :class="twMerge('rounded-full bg-black', chevClass)">
    <VIcon icon="mdi:chevron-right-circle" :width="width" @click="$emit('next')"></VIcon>
  </span>
</div>
</template>