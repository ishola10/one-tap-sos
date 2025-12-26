<script setup lang="ts">
import type { EmergencyType } from '~/utils/emergency'
import { EMERGENCY_CONFIG } from '~/utils/emergency'

const props = defineProps<{
  type: EmergencyType
  onTrigger: () => void
}>()

const config = EMERGENCY_CONFIG[props.type]
</script>

<template>
  <button
    class="flex flex-col items-center justify-center gap-2
           rounded-2xl p-5 h-36 w-full
           text-white font-semibold
           transition active:scale-95 hover:opacity-90
           focus:outline-none focus:ring-2 focus:ring-offset-2"
    :style="{ backgroundColor: `var(--color-${config.color})` }"
    @click="onTrigger"
  >
    <span class="text-3xl">{{ config.icon }}</span>
    <span class="text-sm sm:text-base">{{ config.label }}</span>
  </button>
</template>
