<script setup lang="ts">
import type IActiveConversation from "@/models/IActiveConversation";
import useAuthStore from "@/stores/AuthStore";
import useDrawerStore from "@/stores/DrawerStore";
import { storeToRefs } from "pinia";
import PrivateChat from "./PrivateChat.vue";

const drawer = useDrawerStore();

const { activeConversations } = storeToRefs(drawer);

const auth = useAuthStore();

const getOtherUser = (conversation: IActiveConversation) => {
  const user = conversation.participants.find(
    (participant) => participant !== auth.username
  ) as string;

  return user;
};
</script>

<template>
  <div class="active-conversations">
    <PrivateChat
      v-for="(conversation, index) in activeConversations"
      :key="index"
      :messages="conversation.messages"
      :otherUser="getOtherUser(conversation)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
