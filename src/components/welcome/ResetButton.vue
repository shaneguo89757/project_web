<template>
  <div class="reset-container">
    <button class="reset-button" @click="$emit('reset')">
      <span class="reset-icon">↺</span>
      重新開始
    </button>
  </div>
</template>

<style scoped>
.reset-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reset-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.reset-icon {
  font-size: 1.1rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .reset-container {
    top: 16px;
    right: 16px;
  }

  .reset-button {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style> 