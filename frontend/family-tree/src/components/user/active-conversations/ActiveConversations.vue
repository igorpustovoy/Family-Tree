<script setup lang="ts">
import useOtherUser from "@/composables/useOtherUser";
import useDrawerStore from "@/stores/DrawerStore";
import { storeToRefs } from "pinia";
import PrivateChat from "./PrivateChat.vue";

const drawer = useDrawerStore();

const { activeConversations } = storeToRefs(drawer);

const getOtherUser = useOtherUser();
</script>

<template>
  <div class="active-conversations">
    <PrivateChat
      v-for="(conversation, index) in activeConversations"
      :key="index"
      :messages="conversation.messages"
      :otherUser="getOtherUser(conversation.participants)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
