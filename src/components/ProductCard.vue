<script setup>
const props = defineProps(['product'])
</script>

<template>
  <div class="item__container" :product="product">
    <input type="checkbox" class="delete-checkbox" name="delete-checkbox" :id="'delete-checkbox-' + product.sku">
    <div class="item__details">
      <p>{{ product.sku }}</p>
      <p>{{ product.name }}</p>
      <p>{{ product.price }} $</p>
      <p v-if="product.size">{{ product.size }} MB</p>
      <p v-if="product.weight">{{ product.weight }} KG</p>
      <p v-if="product.height">Dimensions: {{ product.height }}x{{ product.width }}x{{ product.length }}</p>
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
