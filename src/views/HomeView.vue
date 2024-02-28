<script setup>
import { RouterLink } from 'vue-router'
import TheHeader from '../components/TheHeader.vue'
</script>

<template>
  <TheHeader>
    <template #heading>
      Product List
    </template>
    <template #buttons>
      <div class="buttons">        
        <button class="btn add"><RouterLink to="/add-product">Add Product</RouterLink></button>
        <button class="btn delete" id="delete-product-btn">Mass Delete</button>
      </div>
    </template>
  </TheHeader>
  <main>
    <slot>There are currently no products to display.</slot>
  </main>
</template>

<style>

</style>