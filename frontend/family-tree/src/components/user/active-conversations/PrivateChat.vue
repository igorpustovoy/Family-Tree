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
    <MessageBox type="private" :messages="messages" />
    <MessageInput
      type="private"
      :recipient="otherUser"
      :chat-url="'/conversations'"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.chat-window {
  width: 230px;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-bottom: 0px;
  background-color: $background-color-secondary;
}
</style>
