<script setup lang="ts">
defineProps<{
  otherUser: string;
}>();
</script>

<template>
  <div>{{ otherUser }}</div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
