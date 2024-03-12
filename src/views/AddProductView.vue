<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import TheButton from '@/components/TheButton.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useProductsStore } from '@/stores/ProductsStore'

// const pathToFormHandler = '../../../backend/submit_product.php'
const productsStore = useProductsStore()
const router = useRouter()

// Track the specific type of warning to display
const warningType = ref('')

// Check that input fields are not left empty
const validateInputFields = () => {
  const allFieldsFilled = Object.values(productData.value).every(
    (field) => field !== '' && field !== null
  )
  warningType.value = allFieldsFilled ? '' : 'emptyFields'

  if (!allFieldsFilled) {
    return false
  }

  return true
}

// Check that the SKU is unique
const skuExists = async (sku) => {
  await productsStore.getProducts()
  return productsStore.products.some((product) => product.sku === sku)
}

// Check that product type is selected
const validateProductType = () => {
  warningType.value = selectedType.value ? '' : 'productType'

  return selectedType.value
}

// Data properties common to all product types
let commonData = reactive({ sku: '', name: '', price: null })

// Data properties specific to each product type
let dvdData = reactive({ size: null })
let bookData = reactive({ weight: null })
let furnitureData = reactive({ height: null, width: null, length: null })

// The selected product type (dvd, book or furniture)
let selectedType = ref('')

// A watcher that resets the warningType to an empty string when a product type is selected
watch(selectedType, () => {
  // warningType.value = ''
  resetWarning()
})

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
      return null
  }
})

const resetForm = () => {
  commonData.sku = ''
  commonData.name = ''
  commonData.price = null
  dvdData.size = null
  bookData.weight = null
  furnitureData.height = null
  furnitureData.width = null
  furnitureData.length = null

  // Reset necessary to remove warning styles on input fields after form submission
  resetWarning()
}

const resetWarning = () => {
  warningType.value = ''
}

const submitForm = async () => {
  if (!validateProductType() || !validateInputFields()) {
    return // Prevent form submission
  }

  const exists = await skuExists(commonData.sku)
  if (exists) {
    warningType.value = 'skuExists'
    return
  }

  console.log('Selected type: ', selectedType.value)

  // Construct the payload, including the selected product type
  const payload = {
    ...productData.value,
    productType: selectedType.value,
  }

  console.log('Payload: ', payload)

  try {
    await axios
      .post('http://localhost/scandiweb/backend/Product/submit_product.php', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data)
        // Handle success
        productsStore.addProduct(productData.value)
        resetForm()
        router.push('/')
      })
      .catch((error) => {
        console.error('Error:', error)
        // Handle error
      })
  } catch (error) {
    console.error('Error:', error)
    // Handle error
  }
}
</script>

<template>
  <TheHeader>
    <template #heading> Add Product </template>
    <template #buttons>
      <div class="buttons">
        <TheButton type="save" @btn-click="submitForm">Save</TheButton>
        <TheButton type="cancel" @click="$router.push('/')">Cancel</TheButton>
      </div>
    </template>
  </TheHeader>
  <div class="add-product">
    <form action="{pathToFormHandler}" method="post" id="product_form" @submit.prevent="submitForm">
      <fieldset class="input-group no-border">
        <label for="sku">SKU</label>
        <input
          type="text"
          id="sku"
          name="sku"
          autocomplete="off"
          v-model="commonData.sku"
          v-bind:class="{ 'input-warning': warningType === 'emptyFields' && !commonData.sku }"
          @focus="resetWarning"
        />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          autocomplete="off"
          v-model="commonData.name"
          v-bind:class="{ 'input-warning': warningType === 'emptyFields' && !commonData.name }"
          @focus="resetWarning"
        />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="1"
          autocomplete="off"
          v-model="commonData.price"
          v-bind:class="{
            'input-warning':
              warningType === 'emptyFields' &&
              (commonData.price === null || commonData.price === '' || commonData.price < 0)
          }"
          @focus="resetWarning"
        />
      </fieldset>
      <fieldset class="input-group no-border">
        <label for="productType">Type Switcher</label>
        <select
          id="productType"
          name="productType"
          v-model="selectedType"
          v-bind:class="{ 'input-warning': warningType === 'productType' }"
        >
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
        <input
          type="number"
          id="size"
          name="size"
          min="0"
          autocomplete="off"
          v-model="dvdData.size"
          v-bind:class="{
            'input-warning':
              warningType === 'emptyFields' &&
              (dvdData.size === null || dvdData.size === '' || dvdData.size < 0)
          }"
          @focus="resetWarning"
        />
      </fieldset>
      <!-- The input below shows if option Book is selected -->
      <fieldset class="input-group" id="book" v-if="selectedType === 'book'">
        <legend>Please provide weight in Kgs</legend>
        <label for="weight">Weight (KG)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          min="0"
          step="0.1"
          autocomplete="off"
          v-model="bookData.weight"
          v-bind:class="{
            'input-warning':
              warningType === 'emptyFields' &&
              (bookData.weight === null || bookData.weight === '' || bookData.weight < 0)
          }"
          @focus="resetWarning"
        />
      </fieldset>
      <!-- The inputs below show if option Furniture is selected -->
      <fieldset class="input-group column" id="furniture" v-if="selectedType === 'furniture'">
        <legend>Please provide dimensions in HxWxL format</legend>
        <div class="input-group inner">
          <label for="height">Height (CM)</label>
          <input
            type="number"
            id="height"
            name="height"
            min="0"
            autocomplete="off"
            v-model="furnitureData.height"
            v-bind:class="{
              'input-warning':
                warningType === 'emptyFields' &&
                (furnitureData.height === null ||
                  furnitureData.height === '' ||
                  furnitureData.height < 0)
            }"
            @focus="resetWarning"
          />
        </div>
        <div class="input-group inner">
          <label for="width">Width (CM)</label>
          <input
            type="number"
            id="width"
            name="width"
            min="0"
            autocomplete="off"
            v-model="furnitureData.width"
            v-bind:class="{
              'input-warning':
                warningType === 'emptyFields' &&
                (furnitureData.width === null ||
                  furnitureData.width === '' ||
                  furnitureData.width < 0)
            }"
            @focus="resetWarning"
          />
        </div>
        <div class="input-group inner">
          <label for="length">Length (CM)</label>
          <input
            type="number"
            id="length"
            name="length"
            min="0"
            autocomplete="off"
            v-model="furnitureData.length"
            v-bind:class="{
              'input-warning':
                warningType === 'emptyFields' &&
                (furnitureData.length === null ||
                  furnitureData.length === '' ||
                  furnitureData.length < 0)
            }"
            @focus="resetWarning"
          />
        </div>
      </fieldset>
    </form>
    <p class="warning" v-if="warningType === 'productType'">Please select a product type!</p>
    <p class="warning" v-if="warningType === 'emptyFields'">Please fill out all fields!</p>
    <p class="warning" v-if="warningType === 'skuExists'">
      SKU already exists! Please enter a unique SKU.
    </p>
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

.input-warning {
  border: 1px solid var(--color-text-warning);
  background-color: var(--color-background-input-warning);
}

.no-border {
  border: none;
}

.warning {
  color: var(--color-text-warning);
  margin: 1rem;
}

/* Add a max-width on the form container on mobile phones */
@media (max-width: 500px) {
  .add-product {
    max-width: 375px;
  }

  .input-group {
    min-width: initial;
  }
}
</style>
