<script setup lang="ts">
import type IActiveConversation from "@/models/IActiveConversation";
import useAuthStore from "@/stores/AuthStore";
import useDrawerStore from "@/stores/DrawerStore";
import PrivateChat from "./PrivateChat.vue";

const conversations = useDrawerStore().activeConversations;

const auth = useAuthStore();

const getOtherUser = (conversation: IActiveConversation) => {
  const user = conversation.participants.find(
    (participant) => participant !== auth.username
  ) as string;

  return user;
};

console.log("ACTIVE CONVERSATIONS:::", conversations);
</script>

<template>
  <div class="active-conversations">
    <PrivateChat
      v-for="(conversation, index) in conversations"
      :key="index"
      :messages="conversation.messages"
      :otherUser="getOtherUser(conversation)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
