<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
    <h1>{{ msg }}</h1>
  <button class="btn btn-primary w-64 rounded-full">Button</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
