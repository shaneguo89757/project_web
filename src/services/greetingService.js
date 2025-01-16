import { GREETINGS } from '../constants'

export const greetingService = {
  getGreeting(hour = new Date().getHours()) {
    if (hour < 12) return GREETINGS.MORNING
    if (hour < 18) return GREETINGS.AFTERNOON
    return GREETINGS.EVENING
  }
} 