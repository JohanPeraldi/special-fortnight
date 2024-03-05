import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function addProduct(product) {
    products.value.push(product)

    try {
      await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
    } catch (err) {
      error.value = err
    }
  }

  async function deleteProducts(skus) {
    // Find corresponding ids of products to delete
    const idsToDelete = products.value
      .filter((product) => skus.includes(product.sku))
      .map((product) => product.id)

    // Iterate over each ID and send a DELETE request
    const deletePromises = idsToDelete.map((id) =>
      fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      })
    )

    try {
      await Promise.all(deletePromises)
      // After deletion, fetch the updated list of products
      getProducts()
    } catch (err) {
      error.value = err
    }
  }

  async function getProducts() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('http://localhost:3000/products')
      const data = await res.json()
      products.value = data
    } catch (err) {
      error.value = err
    }
    loading.value = false
  }

  return {
    products,
    addProduct,
    deleteProducts,
    getProducts
  }
})
