<script setup>
import ProductCard from '@/components/ProductCard.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheButton from '@/components/TheButton.vue'
import { useProductsStore } from '@/stores/ProductsStore'

const productsStore = useProductsStore()
productsStore.getProducts()

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
    <slot>
      <p v-if="productsStore.products.length === 0">There are currently no products to display.</p>
      <div class="cards-layout" v-else>
        <ProductCard v-for="product in productsStore.products" :key="product.sku" :product="product" />
      </div>
    </slot>
  </main>
</template>

<style scoped>
.cards-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
</style>