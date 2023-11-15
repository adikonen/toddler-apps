<script setup lang="ts">
interface AlphabetCard {
  alphabet: string
}

defineProps<AlphabetCard>()
</script>

<template>
  <VCard>
    {{ alphabet }}
  </VCard>
</template>