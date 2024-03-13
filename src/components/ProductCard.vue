<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['product'])
const emit = defineEmits(['update:selectedProducts'])

const checked = ref(false)

watch(checked, (newValue) => {
  emit('update:selectedProducts', { id: props.product.id, checked: newValue })
})
</script>

<template>
  <div class="item__container" :product="product">
    <input
      type="checkbox"
      class="delete-checkbox"
      name="delete-checkbox"
      :id="'delete-checkbox-' + product.id"
      v-model="checked"
    />
    <div class="item__details">
      <p>{{ product.sku }}</p>
      <p>{{ product.name }}</p>
      <p>{{ product.price }} $</p>
      <p v-if="product.dvd_size">{{ product.dvd_size }} MB</p>
      <p v-if="product.book_weight">{{ product.book_weight }} KG</p>
      <p v-if="product.furniture_height">
        Dimensions: {{ product.furniture_height }}x{{ product.furniture_width }}x{{ product.furniture_length }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  &__container {
    padding: 20px;
    border: 1px solid var(--color-border);
  }

  &__details {
    margin-left: 10px;
    text-align: center;
  }
}
</style>
