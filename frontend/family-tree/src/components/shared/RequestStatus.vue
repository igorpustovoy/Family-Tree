<script setup lang="ts">
import type IRequestStatus from "@/models/IRequestStatus";

defineProps<{
  requestStatus: IRequestStatus;
}>();
</script>

<template>
  <div class="progress" v-if="requestStatus.status === 'pending'">
    <div>{{ requestStatus.message }}</div>
    <v-progress-linear indeterminate color="green-darken-2"></v-progress-linear>
  </div>
  <v-alert v-if="requestStatus.status === 'success'" type="success">{{
    requestStatus.message
  }}</v-alert>
  <v-alert v-if="requestStatus.status === 'error'" type="error">{{
    requestStatus.message
  }}</v-alert>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
