import { ref } from 'vue'

export const useEmergencyCountdown = () => {
  const countdown = ref(0)
  const active = ref(false)
  let timer: NodeJS.Timeout | null = null

  const start = (cb: () => void) => {
    countdown.value = 5
    active.value = true

    timer = setInterval(() => {
      countdown.value--
      navigator.vibrate?.(200)

      if (countdown.value === 0) {
        stop()
        cb()
      }
    }, 1000)
  }

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer)
    }
    active.value = false
  }

  return { countdown, active, start, stop }
}
