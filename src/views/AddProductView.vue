<script setup>
import { ref, reactive, computed } from 'vue'
import TheButton from '@/components/TheButton.vue'
import TheHeader from '@/components/TheHeader.vue'

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
      return { message: 'Please select a product type!'}
  }
})

const resetForm = () => {
  commonData.sku = ''
  commonData.name = ''
  commonData.price = 0
  dvdData.size = 0
  bookData.weight = 0
  furnitureData.dimensions.height = 0
  furnitureData.dimensions.width = 0
  furnitureData.dimensions.length = 0
}

const submitForm = () => {
  // Handle the form submission
  if (!selectedType.value) {
    console.error(productData.value.message)
  } else {
    console.log('Product data:', productData.value)
  }
  resetForm()
}
</script>

<template>
  <TheHeader>
    <template #heading>
      Add Product
    </template>
    <template #buttons>
      <div class="buttons">
        <TheButton type="save" @btn-click="submitForm">Save</TheButton>
        <TheButton type="cancel" @click="$router.push('/')">Cancel</TheButton>
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
    </form>
  </div>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

input {
  &[type='text'],
  &[type='number'] {
    width: 100%;
  }
}

label {
  margin-right: 10px;
  min-width: 100px;
}

.column {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.input-group {
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  min-width: 375px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .inner {
    padding: 0;

    &:nth-of-type(2) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}

.no-border {
  border: none;
}
</style>
