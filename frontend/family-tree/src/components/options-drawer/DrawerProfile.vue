<script setup lang="ts">
import useAuthStore from "@/stores/AuthStore";

const auth = useAuthStore();
</script>

<template>
  <div class="drawer-profile">
    <v-avatar :class="`elevation-4`">
      <v-img
        height="100"
        :src="`https://i.pravatar.cc/50?u=${auth.username}`"
        alt="avatar"
      ></v-img>
    </v-avatar>
    <div class="drawer-profile-info">
      <div class="drawer-profile-info__username">{{ auth.username }}</div>
      <div class="drawer-profile-info__email">{{ auth.email }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.drawer-profile {
  margin-left: 10px;
  height: 90px;
  padding: 16px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  .drawer-profile-info {
    display: flex;
    flex-direction: column;
    .drawer-profile-info__username {
      font-weight: 600;
    }
    .drawer-profile-info__email {
      color: $text-color-grey;
      font-size: 0.9rem;
    }
  }
}
</style>
