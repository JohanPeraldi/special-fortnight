import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  function addProduct(product) {
    this.products.push(product)
  }

  function deleteProduct(ids) {
    this.products = this.products.filter(product => !ids.includes(product.sku))
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
    deleteProduct,
    getProducts
  }
})
