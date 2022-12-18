<script setup lang="ts">
import MessageBox from "@/components/shared/MessageBox.vue";
import MessageInput from "@/components/shared/MessageInput.vue";
import type IChatMessage from "@/models/IChatMessage";
import ChatHeader from "./ChatHeader.vue";

defineProps<{
  otherUser: string;
  messages: IChatMessage[];
}>();
</script>

<template>
  <div class="chat-window">
    <ChatHeader :otherUser="otherUser" />
    <MessageBox :messages="messages" />
    <MessageInput :recipient="otherUser" :chat-url="'/conversations'" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.chat-window {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 5px solid white;
  border-bottom: 0px;
}
</style>
