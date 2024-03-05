<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheButton from '@/components/TheButton.vue'
</script>

<template>
  <TheHeader>
    <template #heading> 404 - Not Found </template>
    <template #buttons>
      <div class="buttons">
        <TheButton type="add" @click="$router.push('/')">Return Home</TheButton>
      </div>
    </template>
  </TheHeader>
</template>
