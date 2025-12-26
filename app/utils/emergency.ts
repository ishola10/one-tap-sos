export type EmergencyType = 'medical' | 'police' | 'fire' | 'trusted'

export const EMERGENCY_CONFIG = {
  medical: {
    label: 'Medical',
    icon: '🚑',
    color: 'medical',
    number: '112',
    message: 'EMERGENCY 🚑\nI need medical assistance.'
  },
  police: {
    label: 'Police',
    icon: '🚓',
    color: 'police',
    number: '112',
    message: 'EMERGENCY 🚓\nI need police assistance.'
  },
  fire: {
    label: 'Fire',
    icon: '🔥',
    color: 'fire',
    number: '112',
    message: 'EMERGENCY 🔥\nThere is a fire emergency.'
  },
  trusted: {
    label: 'Trusted Contact',
    icon: '👤',
    color: 'trusted',
    number: '', // Filled from localStorage later
    message: 'I need help. Please reach me immediately.'
  }
} as const
