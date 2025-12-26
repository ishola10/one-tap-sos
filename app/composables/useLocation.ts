import { ref, computed } from 'vue'

export const useLocation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const coords = ref<{ lat: number, lng: number } | null>(null)

  const getLocation = () => {
    loading.value = true
    error.value = null

    if (!navigator.geolocation) {
      error.value = 'Geolocation not supported'
      loading.value = false
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        loading.value = false
      },
      () => {
        error.value = 'Location permission denied'
        loading.value = false
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    )
  }

  const googleMapsLink = computed(() => {
    if (!coords.value) return ''
    return `https://maps.google.com/?q=${coords.value.lat},${coords.value.lng}`
  })

  const previewText = computed(() => {
    if (!coords.value) return 'Fetching location…'
    return `Lat: ${coords.value.lat.toFixed(
      4
    )}, Lng: ${coords.value.lng.toFixed(4)}`
  })

  return {
    loading,
    error,
    coords,
    getLocation,
    googleMapsLink,
    previewText
  }
}
