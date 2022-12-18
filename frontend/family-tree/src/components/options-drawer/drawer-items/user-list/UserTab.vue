<script setup lang="ts">
import useAuthStore from "@/stores/AuthStore";
import useDrawerStore from "@/stores/DrawerStore";

const props = defineProps<{
  username: string;
  email: string;
}>();

const drawer = useDrawerStore();

console.log("CONVERSATIONS:", drawer.conversations);

const handleOpenChat = () => {
  const auth = useAuthStore();

  const activeConversation = drawer.activeConversations.find(
    (conversation) =>
      conversation.participants.includes(props.username) &&
      conversation.participants.includes(auth.username)
  );

  if (activeConversation) {
    return;
  }

  const conversation = drawer.conversations.find(
    (conversation) =>
      conversation.participants.includes(props.username) &&
      conversation.participants.includes(auth.username)
  );

  if (conversation) {
    drawer.addActiveConversation(conversation);
  } else {
    drawer.addActiveConversation({
      participants: [props.username, auth.username],
      messages: [],
    });
  }
};
</script>

<template>
  <div class="user-tab">
    <div class="user-tab__left">
      <div class="user-tab__avatar">
        <v-avatar size="40" :class="`elevation-4`">
          <v-img
            size="20"
            :src="`https://i.pravatar.cc/50?u=${username}`"
            alt="avatar"
          ></v-img>
        </v-avatar>
      </div>
      <div class="user-tab__user-info">
        <div class="user-tab__user-info__name">{{ username }}</div>
        <div class="user-tab__user-info__email">{{ email }}</div>
      </div>
    </div>
    <div class="user-tab__right">
      <v-btn
        @click="handleOpenChat()"
        size="40px"
        class="ma-2"
        color="none"
        icon="mdi-message-text-outline"
      ></v-btn>
      <v-btn
        size="40px"
        class="ma-2"
        color="none"
        icon="mdi-graph-outline"
      ></v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.user-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 200px;
  overflow-y: hidden;
  margin-bottom: 4px;
  .user-tab__left {
    display: flex;
    align-items: center;
    gap: 8px;
    ::-webkit-scrollbar {
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: black;
    }

    ::-webkit-scrollbar-thumb {
      background: $text-color-grey;
    }

    .user-tab__user-info {
      max-width: 170px;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 5px 0px;

      .user-tab__user-info__email {
        color: $text-color-grey;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
