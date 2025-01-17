<template>
  <div class="app-container">
    <div class="welcome-screen">
      <ResetButton 
        v-if="userName"
        @reset="handleReset"
      />

      <transition name="fade" mode="out-in">
        <component :is="currentComponent"
          :user-name="userName"
          :birth-year="birthYear"
          :birth-month="birthMonth"
          :birth-day="birthDay"
          :name="userName"
          :year="birthYear"
          :month="birthMonth"
          :day="birthDay"
          @submit="handleComponentSubmit"
          @select="handleComponentSelect"
          @next="handleNext"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUser } from '../composables/useUser'
import { useError } from '../composables/useError'
import { STORAGE_KEYS } from '../constants'

// 導入組件
import ResetButton from '../components/welcome/ResetButton.vue'
import NameInput from '../components/welcome/NameInput.vue'
import YearInput from '../components/welcome/YearInput.vue'
import MonthSelect from '../components/welcome/MonthSelect.vue'
import DaySelect from '../components/welcome/DaySelect.vue'
import FinalGreeting from '../components/welcome/FinalGreeting.vue'
import SequenceDisplay from '../components/welcome/SequenceDisplay.vue'

// 核心邏輯
const { userName, saveUser, loadUser } = useUser()
const { error, handleError } = useError()

// 狀態管理
const birthYear = ref('')
const birthMonth = ref('')
const birthDay = ref('')
const showSequence = ref(false)

// 計算當前應該顯示的組件
const currentComponent = computed(() => {
  if (!userName.value) return NameInput
  if (!birthYear.value) return YearInput
  if (!birthMonth.value) return MonthSelect
  if (!birthDay.value) return DaySelect
  if (!showSequence.value) return FinalGreeting
  return SequenceDisplay
})

// 添加處理下一步的函數
const handleNext = () => {
  showSequence.value = true
}

// 重置時也要重置 showSequence
const handleReset = () => {
  try {
    userName.value = ''
    birthYear.value = ''
    birthMonth.value = ''
    birthDay.value = ''
    showSequence.value = false
    localStorage.removeItem(STORAGE_KEYS.USER_NAME)
    localStorage.removeItem(STORAGE_KEYS.BIRTH_YEAR)
    localStorage.removeItem(STORAGE_KEYS.BIRTH_MONTH)
    localStorage.removeItem(STORAGE_KEYS.BIRTH_DAY)
  } catch (e) {
    handleError(e)
  }
}

// 事件處理
const handleNameSubmit = (name) => {
  try {
    saveUser(name)
    userName.value = name
  } catch (e) {
    handleError(e)
  }
}

const handleYearSubmit = (year) => {
  try {
    birthYear.value = year
    localStorage.setItem(STORAGE_KEYS.BIRTH_YEAR, year)
  } catch (e) {
    handleError(e)
  }
}

const handleMonthSelect = (month) => {
  try {
    birthMonth.value = month
    localStorage.setItem(STORAGE_KEYS.BIRTH_MONTH, month)
  } catch (e) {
    handleError(e)
  }
}

const handleDaySelect = (day) => {
  try {
    birthDay.value = day
    localStorage.setItem(STORAGE_KEYS.BIRTH_DAY, day)
  } catch (e) {
    handleError(e)
  }
}

// 添加統一的事件處理
const handleComponentSubmit = (value) => {
  if (!userName.value) {
    handleNameSubmit(value)
  } else if (!birthYear.value) {
    handleYearSubmit(value)
  }
}

const handleComponentSelect = (value) => {
  if (!birthMonth.value) {
    handleMonthSelect(value)
  } else if (!birthDay.value) {
    handleDaySelect(value)
  }
}

// 如果需要使用基礎路徑
const baseUrl = import.meta.env.VITE_BASE_URL
</script>

<style>
/* 全局樣式 */
#app {
  min-height: 100vh;
  display: flex;
}

.app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.welcome-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

/* 過渡動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 移動設備優化 */
@media (max-width: 768px) {
  .welcome-screen {
    padding: 0;
    align-items: flex-start;
    padding-top: 70%;
  }
}

/* 禁用文字選擇 */
.welcome-screen * {
  -webkit-user-select: none;
  user-select: none;
}

/* 允許輸入框文字選擇 */
input {
  -webkit-user-select: text;
  user-select: text;
}
</style> 