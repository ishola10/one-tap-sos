<script setup lang="ts">
import { ref, watch } from 'vue'
import { EMERGENCY_CONFIG, type EmergencyType } from '~/utils/emergency'
import { useLocation } from '~/composables/useLocation'
import { useEmergencyCountdown } from '#imports'
import { isOnline } from '~/utils/network'

const showTrustedModal = ref(false)
const pendingType = ref<EmergencyType | null>(null)

const {
  loading,
  error,
  getLocation,
  googleMapsLink,
  previewText
} = useLocation()

const {
  countdown,
  active,
  start,
  stop
} = useEmergencyCountdown()

watch(googleMapsLink, (link) => {
  if (!link || !pendingType.value) return

  const type = pendingType.value
  const config = EMERGENCY_CONFIG[type]

  const getTrustedNumber = () => {
    if (!import.meta.client) return null
    return localStorage.getItem('trustedNumber')
  }

  const number
    = type === 'trusted'
      ? getTrustedNumber()
      : config.number

  if (!number) {
    showTrustedModal.value = true
    pendingType.value = null
    return
  }

  const body = `${config.message}\n\nMy location:\n${link}`
  window.location.href = `sms:${number}?body=${encodeURIComponent(body)}`

  pendingType.value = null
})

const sendEmergency = (type: EmergencyType) => {
  if (!isOnline()) {
    alert('You are offline. SMS may still work, but maps could fail.')
  }

  pendingType.value = type
  getLocation()
}

const handleEmergency = (type: EmergencyType) => {
  if (type === 'trusted') {
    const trusted = localStorage.getItem('trustedNumber')
    if (!trusted) {
      showTrustedModal.value = true
      return
    }
  }

  navigator.vibrate?.(300)

  start(() => {
    sendEmergency(type)
  })
}
</script>

<template>
  <main class="max-w-3xl mx-auto py-10 sm:py-16 px-4">
    <section class="text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold mb-3">
        One-Tap Emergency Alerts
      </h1>
      <p class="text-muted max-w-xl mx-auto">
        Tap once to alert emergency services or trusted contacts.
        You’ll have a few seconds to cancel if triggered accidentally.
      </p>
    </section>

    <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <EmergencyButton
        v-for="(cfg, key) in EMERGENCY_CONFIG"
        :key="key"
        :type="key"
        :on-trigger="() => handleEmergency(key)"
      />
    </section>

    <div
      v-if="active"
      class="mt-6 text-center"
    >
      <p class="text-lg font-semibold mb-2">
        Sending alert in {{ countdown }}…
      </p>
      <UButton
        color="error"
        variant="soft"
        @click="stop"
      >
        Cancel
      </UButton>
    </div>

    <div
      v-if="loading || googleMapsLink"
      class="mt-6 text-center text-sm text-muted"
    >
      🧭 {{ previewText }}
    </div>

    <p
      v-if="error"
      class="mt-4 text-center text-red-500"
    >
      {{ error }}
    </p>

    <div class="mt-10 text-center">
      <UButton
        variant="outline"
        @click="showTrustedModal = true"
      >
        📍 Set Trusted Contact
      </UButton>
    </div>

    <section class="my-12 rounded-xl border p-4 text-sm text-muted bg-muted/30">
      ⚠️ Ensure location permissions and SMS access are enabled on your device.
    </section>

    <TrustedContactModal v-model="showTrustedModal" />
  </main>
</template>
