<script setup lang="ts">
import type IChatMessage from "@/models/IChatMessage";

defineProps<{
  messages: IChatMessage[];
}>();
</script>

<template>
  <div className="message-container">
    <div class="message" v-for="(message, index) in messages" :key="index">
      <div className="message__author">{{ message.author }}:</div>
      <div className="message__content">{{ message.message }}</div>
      <v-divider></v-divider>
    </div>
    <!-- <div ref={messagesEndRef} /> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.message-container {
  max-height: 350px;
  overflow-y: auto;
}
</style>
