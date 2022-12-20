<script setup lang="ts">
import useDrawerStore from "@/stores/DrawerStore";
import { storeToRefs } from "pinia";
import ConversationTab from "./ConversationTab.vue";

const drawer = useDrawerStore();
const { conversations } = storeToRefs(drawer);
</script>

<template>
  <div v-if="conversations.length" class="conversation-list">
    <ConversationTab
      v-for="conversation in conversations"
      :key="conversation._id"
      :conversation="conversation"
    />
  </div>
  <div class="no-conversations" v-else>
    <div>You don't have any conversations yet.</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.conversation-list {
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
}
.no-conversations {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
