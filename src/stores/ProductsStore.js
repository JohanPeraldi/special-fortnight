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
      await axios.post('http://localhost/scandiweb/backend/Product/submit_product.php', product, {
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
      return axios.delete('http://localhost/scandiweb/backend/Product/delete_products.php', {})
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
      const res = await axios.get('http://localhost/scandiweb/backend/Product/fetch_products.php')
      if (res.data && res.data.error) {
        error.value = res.data.error
      } else {
        products.value = res.data
      }
    } catch (err) {
      if (err.message && err.message.includes("Network Error")) {
        error.value = "We're having trouble connecting to our services. Please try again later."
      } else if (err.response && err.response.data && err.response.data.error) {
        error.value = "We're currently experiencing some technical difficulties accessing our data. Please try again later."
      } else {
        error.value = "An unexpected error occured. Please try again later."
      }
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProducts,
    getProducts
  }
})
