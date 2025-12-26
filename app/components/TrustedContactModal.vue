<script setup lang="ts">
import { ref, onMounted } from 'vue'

const open = defineModel<boolean>()
const number = ref('')

onMounted(() => {
  number.value = localStorage.getItem('trustedNumber') || ''
})

const normalizePhone = (input: string) => {
  const digits = input.replace(/\D/g, '')

  if (digits.startsWith('234') && digits.length === 13) {
    return `+${digits}`
  }

  if (digits.startsWith('0') && digits.length === 11) {
    return `+234${digits.slice(1)}`
  }

  if (digits.length === 10) {
    return `+234${digits}`
  }

  return null
}

const save = () => {
  const normalized = normalizePhone(number.value)

  if (!normalized) {
    alert('Enter a valid Nigerian phone number')
    return
  }

  localStorage.setItem('trustedNumber', normalized)
  number.value = normalized
  open.value = false
}
</script>

<template>
  <UModal v-model="open">
    <UCard>
      <template #header>
        <h3 class="font-semibold">
          Trusted Contact
        </h3>
      </template>

      <UInput
        v-model="number"
        placeholder="e.g. 08012345678 or +2348012345678"
        type="tel"
      />

      <template #footer>
        <UButton
          color="primary"
          block
          @click="save"
        >
          Save Contact
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
