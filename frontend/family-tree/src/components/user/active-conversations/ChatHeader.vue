<script setup lang="ts">
import useDrawerStore from "@/stores/DrawerStore";
import useAuthStore from "@/stores/AuthStore";

const props = defineProps<{
  otherUser: string;
}>();

const auth = useAuthStore();
const drawer = useDrawerStore();

const handleCloseChat = () => {
  drawer.closeActiveConversation([auth.username, props.otherUser]);
  console.log(drawer.activeConversations);
};
</script>

<template>
  <div class="chat-header">
    <div class="chat-header__user-info">
      <v-avatar :class="`elevation-2`" size="35">
        <v-img
          :src="`https://i.pravatar.cc/50?u=${otherUser}`"
          alt="avatar"
        ></v-img>
      </v-avatar>
      <div class="chat-header__user-info__username">{{ otherUser }}</div>
    </div>
    <v-btn
      @click="handleCloseChat()"
      elevation="0"
      icon="mdi-close"
      max-height="35"
      max-width="35"
    >
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.chat-header {
  display: flex;
  justify-content: space-between;
  background-color: $theme-color;
  padding: 6px;
  .chat-header__user-info {
    display: flex;
    gap: 10px;
    align-items: center;
    .chat-header__user-info__username {
      font-size: 1.05rem;
    }
  }
  button {
    border-radius: 0;
    background-color: $theme-color;
  }
}
</style>
