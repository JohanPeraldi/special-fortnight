import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  // const products = ref([])
  // A few demo products
  const products = ref([
    {
      sku: 'dvd001',
      name: 'Rocky',
      price: 0.99,
      size: 450
    },
    {
      sku: 'dvd002',
      name: 'Terminator',
      price: 0.99,
      size: 480
    },
    {
      sku: 'dvd003',
      name: 'Rambo',
      price: 0.99,
      size: 520
    },
    {
      sku: 'book001',
      name: 'The Great Gatsby',
      price: 4.79,
      weight: 0.122
    },
    {
      sku: 'book002',
      name: 'To Kill a Mockingbird',
      price: 6.89,
      weight: 0.155
    },
    {
      sku: 'book003',
      name: '1984',
      price: 5.99,
      weight: 0.2
    },
    {
      sku: 'furn001',
      name: 'A pretty cool bed',
      price: 1499.90,
      height: 80,
      width: 180,
      length: 220
    },
    {
      sku: 'furn002',
      name: 'A pretty cool gaming chair',
      price: 149.90,
      height: 135,
      width: 55,
      length: 45
    },
    {
      sku: 'furn003',
      name: 'A pretty cool desk',
      price: 749.90,
      height: 110,
      width: 70,
      length: 150
    }
  ])
  function addProduct(product) {
    this.products.push(product)
  }

  return {
    products,
    addProduct
  }
})
