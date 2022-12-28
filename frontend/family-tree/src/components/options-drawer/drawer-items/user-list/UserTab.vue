<script setup lang="ts">
import useAuthStore from "@/stores/AuthStore";
import useChat from "@/composables/useChat";
import { useRouter } from "vue-router";

defineProps<{
  username: string;
  email: string;
}>();

const router = useRouter();

const auth = useAuthStore();
</script>

<template>
  <div class="user-tab">
    <div class="user-tab__left">
      <div class="user-tab__avatar">
        <v-avatar size="40" :class="`elevation-4`">
          <v-img
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
        @click="useChat([username, auth.username])"
        size="40px"
        class="ma-2"
        color="none"
        icon="mdi-message-text-outline"
      ></v-btn>
      <v-btn
        @click="router.push(`/tree/${username}`)"
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
