<script setup lang="ts">
import useOtherUser from "@/composables/useOtherUser";
import type IConversation from "@/models/IConversation";
import useAuthStore from "@/stores/AuthStore";
import { computed } from "vue";
import useChat from "@/composables/useChat";

const props = defineProps<{
  conversation: IConversation;
}>();

const getOtherUser = useOtherUser();

const auth = useAuthStore();

const lastMessage = computed(() => {
  return props.conversation.messages[props.conversation.messages.length - 1];
});

const chat = useChat;
</script>

<template>
  <div @click="chat(conversation.participants)" class="conversation-tab">
    <v-avatar size="40" :class="`elevation-4`">
      <v-img
        :src="`https://i.pravatar.cc/50?u=${getOtherUser(
          conversation.participants
        )}`"
        alt="avatar"
      ></v-img>
    </v-avatar>
    <div class="conversation-tab__info">
      <div class="conversation-tab__info__username">
        {{ getOtherUser(conversation.participants) }}
      </div>
      <div
        v-if="lastMessage.author === auth.username"
        class="conversation-tab__info__message"
      >
        You: {{ lastMessage.message }}
      </div>

      <div v-else class="conversation-tab__info__message">
        {{ lastMessage.author }}: {{ lastMessage.message }}
      </div>
    </div>
  </div>
  <v-divider></v-divider>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.conversation-tab {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: $background-color-tertiary;
  }
  .conversation-tab__info {
    display: flex;
    flex-direction: column;
    .conversation-tab__info__message {
      color: $text-color-grey;
      font-size: 0.9rem;
    }
  }
}
</style>
