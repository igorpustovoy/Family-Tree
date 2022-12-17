<script setup lang="ts">
import MessageInput from "@/components/shared/MessageInput.vue";
import MessageBox from "@/components/shared/MessageBox.vue";
import useDrawerStore from "@/stores/DrawerStore";

const drawerStore = useDrawerStore();

const messages = drawerStore.globalMessages;
</script>

<template>
  <div className="chat-container">
    <MessageBox :messages="messages" />
    <MessageInput chatUrl="/global-chat" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
