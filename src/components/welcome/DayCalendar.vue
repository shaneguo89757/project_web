<template>
  <div class="calendar">
    <div class="weekdays">
      <span v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>
    <div class="days-grid">
      <button
        v-for="{ day, type } in calendarDays"
        :key="`${type}-${day}`"
        class="day-button"
        :class="{ 'other-month': type === 'other' }"
        @click="handleSelect(day)"
        :disabled="type === 'other'"
      >
        <span>{{ day }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  year: { type: [Number, String], required: true },
  month: { type: [Number, String], required: true }
})

const emit = defineEmits(['select'])

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const calendarDays = computed(() => {
  const year = Number(props.year)
  const month = Number(props.month)
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const daysInMonth = lastDay.getDate()
  const startingDay = firstDay.getDay()
  
  const calendar = []
  
  // 添加上個月的日期
  const prevMonthDays = startingDay
  if (prevMonthDays > 0) {
    const prevMonth = month === 1 ? 12 : month - 1
    const prevYear = month === 1 ? year - 1 : year
    const prevMonthLastDay = new Date(prevYear, prevMonth, 0).getDate()
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      calendar.push({
        day: prevMonthLastDay - i,
        type: 'other'
      })
    }
  }
  
  // 添加當前月份的日期
  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({
      day: i,
      type: 'current'
    })
  }
  
  // 添加下個月的日期以填滿網格
  const remainingDays = 42 - calendar.length // 6行7列 = 42個格子
  for (let i = 1; i <= remainingDays; i++) {
    calendar.push({
      day: i,
      type: 'other'
    })
  }
  
  return calendar
})

const handleSelect = (day) => {
  emit('select', day)
}
</script>

<style scoped>
.calendar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.weekdays span {
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.day-button {
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  border-radius: inherit;
}

.day-button span {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.day-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.day-button:hover:not(:disabled)::before {
  opacity: 1;
}

.day-button:hover:not(:disabled) span {
  color: white;
}

.day-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.day-button.other-month {
  color: rgba(255, 255, 255, 0.4);
  cursor: default;
}

/* 移動設備優化 */
@media (max-width: 768px) {
  .calendar {
    padding: 15px;
  }

  .weekdays span {
    font-size: 0.8rem;
    padding: 8px;
  }

  .day-button {
    font-size: 0.9rem;
  }
}
</style> 