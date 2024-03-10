import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function addProduct(product) {
    products.value.push(product)

    try {
      await axios.post('http://localhost:3000/products', product, {
        headers: {
          'Content-Type': 'application/json'
        }
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
    const deletePromises = idsToDelete.map((id) => {
      return axios.delete(`http://localhost:3000/products/${id}`, {})
    })

    try {
      await Promise.all(deletePromises)
      // After deletion, get the updated list of products
      getProducts()
    } catch (err) {
      error.value = err
    }
  }

  async function getProducts() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost/scandiweb/backend/fetch_products.php')
      products.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    addProduct,
    deleteProducts,
    getProducts
  }
})
