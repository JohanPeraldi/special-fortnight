<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import ProductCard from '@/components/ProductCard.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheButton from '@/components/TheButton.vue'
import { useProductsStore } from '@/stores/ProductsStore'

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT
const productsStore = useProductsStore()
const selectedProducts = ref([])
const deletionError = ref(null)

const updateSelectedProducts = ({ id, checked }) => {
  if (checked) {
    selectedProducts.value.push(id)
  } else {
    selectedProducts.value = selectedProducts.value.filter((productId) => productId !== id)
  }
}

const deleteProducts = async () => {
  try {
    const response = await axios.delete(`${apiEndpoint}/delete_products.php`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        ids: selectedProducts.value
      }
    })
    if (response.status !== 200) {
      throw new Error('Failed to delete products')
    }
    // If deletion from database was successful, delete products from store
    productsStore.deleteProducts(selectedProducts.value)
    selectedProducts.value = []
    // Optionally, refresh the products list from the backend
    productsStore.getProducts()
    deletionError.value = null
  } catch (error) {
    deletionError.value =
      'An error occurred while attempting to delete one or several products. Please try again later.'
  }
}

const sortedProducts = computed(() => {
  // Check if there's an error or if products are not loaded yet
  if (productsStore.error || productsStore.loading || !productsStore.products) {
    // Return an empty array or handle accordingly
    return []
  }
  // Proceed with sorting if there's no error and products are loaded
  return [...productsStore.products].sort((a, b) => a.sku.localeCompare(b.sku))
})

onMounted(() => {
  productsStore.getProducts()
})
</script>

<template>
  <TheHeader>
    <template #heading> Product List </template>
    <template #buttons>
      <div class="buttons">
        <TheButton type="add" @click="$router.push('/add-product')">ADD</TheButton>
        <TheButton type="delete" @click="deleteProducts" id="delete-product-btn"
          >MASS DELETE</TheButton
        >
      </div>
    </template>
  </TheHeader>
  <main>
    <p class="warning" v-if="deletionError">{{ deletionError }}</p>
    <slot>
      <p v-if="productsStore.loading">Loading products...</p>
      <p v-else-if="productsStore.error">{{ productsStore.error }}</p>
      <p v-else-if="productsStore.products.length === 0">
        There are currently no products to display.
      </p>
      <div class="cards-layout" v-else>
        <ProductCard
          v-for="product in sortedProducts"
          :key="product.sku"
          :product="product"
          @update:selectedProducts="updateSelectedProducts"
        />
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
