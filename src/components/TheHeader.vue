<template>
  <header class="header">
    <h1>
      <slot name="heading">Heading should be here</slot>
    </h1>
    <slot name="buttons">Buttons should be here</slot>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 10px;
}
</style>
