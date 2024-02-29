<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button :class="['btn', type]" @click="$emit('btn-click')">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  transition: 0.4s;
  padding: 0.5rem 1rem;
}

.add,
.save {
  color: hsla(160, 100%, 37%, 1);
}

.cancel,
.delete {
  color: rgb(209, 62, 9);
  border-left: 1px solid var(--color-border);
}

@media (hover: hover) {
  .add:hover,
  .save:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }

  .cancel:hover,
  .delete:hover {
    background-color: hsla(25, 100%, 33%, 0.2);
  }
}
</style>