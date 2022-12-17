<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="panel-title">
      <v-icon>{{ icon }}</v-icon>
      <span>{{ title }}</span>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <template #default>
        <slot>Coming Soon</slot>
      </template>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.panel-title {
  display: flex;
  gap: 10px;
}
</style>
