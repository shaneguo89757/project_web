<template>
  <div class="welcome-form">
    <slot></slot>
  </div>
</template>

<style scoped>
.welcome-form {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

:deep(.welcome-header) {
  text-align: center;
  margin-bottom: 2rem;
}

:deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

:deep(.subtitle) {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

:deep(.input-container) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(input) {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  color: white;
}

:deep(input::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

:deep(input:focus) {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

:deep(.submit-button) {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

:deep(.submit-button:hover:not(:disabled)) {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

:deep(.submit-button:disabled) {
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

:deep(.submit-button:active:not(:disabled)) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style> 