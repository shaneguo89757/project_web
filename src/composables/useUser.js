import { ref } from 'vue'
import { STORAGE_KEYS } from '../constants'

export function useUser() {
  const userName = ref('')

  const saveUser = (name) => {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, name)
  }

  const loadUser = () => {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME)
  }

  return {
    userName,
    saveUser,
    loadUser
  }
} 