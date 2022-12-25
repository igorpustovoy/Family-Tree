<script setup lang="ts">
import AddPersonModal from "./AddPersonModal.vue";
</script>

<template>
  <div class="options-bar">
    <AddPersonModal />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.options-bar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 9;
}
</style>
