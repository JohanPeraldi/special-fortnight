<script setup>
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button :class="['btn', props.type]" @click="$emit('btn-click')">
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
  color: var(--color-text-highlight);
}

.cancel,
.delete {
  color: var(--color-text-warning);
  border-left: 1px solid var(--color-border);
}

@media (hover: hover) {
  .add:hover,
  .save:hover {
    background-color: var(--color-background-highlight);
  }

  .cancel:hover,
  .delete:hover {
    background-color: var(--color-background-warning);
  }
}
</style>
