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
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
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
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
}

@media (hover: hover) {
  .day-button:hover:not(:disabled) {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

@media (hover: none) {
  .day-button:active:not(:disabled) {
    background: rgba(255, 255, 255, 0.25);
  }
}

.day-button:active:not(:disabled) {
  transform: translateY(0);
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