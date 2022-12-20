<script setup lang="ts">
import type IChatMessage from "@/models/IChatMessage";
import { computed } from "vue";

const props = defineProps<{
  messages: IChatMessage[];
  type: "global" | "private";
}>();

const isPrivate = computed(() => props.type === "private");
</script>

<template>
  <div class="message-container" :class="{ 'private-chat': isPrivate }">
    <div class="message" v-for="(message, index) in messages" :key="index">
      <div class="message__author">{{ message.author }}:</div>
      <div class="message__content">{{ message.message }}</div>
      <v-divider></v-divider>
    </div>
    <!-- <div ref={messagesEndRef} /> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.message-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 350px;
  overflow-y: auto;
  .message {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 4px;
    padding-right: 5px;
    .message__author {
      display: flex;
      align-items: flex-end;
      font-size: 0.85rem;
    }

    .message__content {
      display: flex;
      align-items: flex-end;
      font-size: 0.95rem;
      word-break: break-all;
    }
  }
  .message.system-message {
    padding: 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85rem;
  }
}

.private-chat {
  padding: 10px;
  .message {
    .message__author {
      color: $text-color-grey;
    }
  }
}
</style>
