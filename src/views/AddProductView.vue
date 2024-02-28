<script setup>
import { ref, reactive, computed } from 'vue'
import TheHeader from '../components/TheHeader.vue'

// Data properties common to all product types
let commonData = reactive({ sku: '', name: '', price: 0 })

// Data properties specific to each product type
let dvdData = reactive({ size: 0 })
let bookData = reactive({ weight: 0 })
let furnitureData = reactive({ dimensions: { height: 0, width: 0, length: 0 } })

// The selected product type (dvd, book or furniture)
let selectedType = ref('')

// A computed property that returns the selected product type data
let productData = computed(() => {
  switch (selectedType.value) {
    case 'dvd':
      return { ...commonData, ...dvdData }
    case 'book':
      return { ...commonData, ...bookData }
    case 'furniture':
      return { ...commonData, ...furnitureData }
    default:
      return commonData
  }
})

// Define your submitForm method
const submitForm = () => {
  // Here you can handle the form submission.
  // For example, you can send the form data to a server.
  console.log('Product data:', productData.value)
}
</script>

<template>
  <TheHeader>
    <template #heading>
      Add Product
    </template>
    <template #buttons>
      <div class="buttons">
        <button class="btn save">Save</button>
        <button class="btn cancel"><RouterLink to="/">Cancel</RouterLink></button>
      </div>
    </template>
  </TheHeader>
  <div class="add-product">
    <form id="product_form" @submit.prevent="submitForm">
      <fieldset class="input-group no-border">
        <label for="sku">SKU</label>
        <input type="text" id="sku" name="sku" autocomplete="off" v-model="commonData.sku" />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" autocomplete="off" v-model="commonData.name" />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="price">Price ($)</label>
        <input type="number" id="price" name="price" min="0" value="0" step="0.01" autocomplete="off" v-model="commonData.price" />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="productType">Type Switcher</label>
        <select id="productType" name="productType" v-model="selectedType">
          <option value="">Type Switcher</option>
          <option value="dvd">DVD</option>
          <option value="book">Book</option>
          <option value="furniture">Furniture</option>
        </select>
      </fieldset>
      <!-- The input below shows if option DVD is selected -->
      <fieldset class="input-group" id="dvd" v-if="selectedType === 'dvd'">
        <legend>Please provide size in MB</legend>
        <label for="size">Size (MB)</label>
        <input type="number" id="size" name="size" min="0" value="0" step="0.01" autocomplete="off" v-model="dvdData.size" />
      </fieldset>
      <!-- The input below shows if option Book is selected -->
      <fieldset class="input-group" id="book" v-if="selectedType === 'book'">
        <legend>Please provide weight in Kgs</legend>
        <label for="weight">Weight (KG)</label>
        <input type="number" id="weight" name="weight" min="0" value="0" step="0.001" autocomplete="off" v-model="bookData.weight" />
      </fieldset>
      <!-- The inputs below show if option Furniture is selected -->
      <fieldset class="input-group column" id="furniture" v-if="selectedType === 'furniture'">
        <legend>Please provide dimensions in HxWxL format</legend>
        <div class="input-group inner">
          <label for="height">Height (CM)</label>
          <input type="number" id="height" name="height" min="0" value="0" autocomplete="off" v-model="furnitureData.dimensions.height" />
        </div>
        <div class="input-group inner">
          <label for="width">Width (CM)</label>
          <input type="number" id="width" name="width" min="0" value="0" autocomplete="off" v-model="furnitureData.dimensions.width" />
        </div>
        <div class="input-group inner">
          <label for="length">Length (CM)</label>
          <input type="number" id="length" name="length" min="0" value="0" autocomplete="off" v-model="furnitureData.dimensions.length" />
        </div>
      </fieldset>

      <!-- For testing only -->
      <button type="submit" class="btn save m-top">Submit</button>
    </form>
  </div>
</template>

<style>
.m-top {
  margin-top: 1.6rem;
}
</style>
