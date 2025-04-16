<script setup>
import mainLayout from './components/mainLayout.vue'
</script>

<template>
  <mainLayout>
    <RouterView />
  </mainLayout>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
