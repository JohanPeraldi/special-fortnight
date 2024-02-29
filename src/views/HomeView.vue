<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheButton from '@/components/TheButton.vue'

const deleteProducts = () => {
  // TODO: Handle deletion of selected products
  console.log('Delete selected products')
}
</script>

<template>
  <TheHeader>
    <template #heading>
      Product List
    </template>
    <template #buttons>
      <div class="buttons">
        <TheButton type="add" @click="$router.push('/add-product')">Add Product</TheButton>
        <TheButton type="delete" @click="deleteProducts" id="delete-product-btn">Mass Delete</TheButton>
      </div>
    </template>
  </TheHeader>
  <main>
    <slot>There are currently no products to display.</slot>
  </main>
</template>
