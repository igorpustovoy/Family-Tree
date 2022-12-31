<script setup lang="ts">
import axios from "@/api/axios";
import useAuthStore from "@/stores/AuthStore";

const auth = useAuthStore();

const handleLogout = async () => {
  try {
    await axios.get("/users/logout");

    auth.clearAuth();

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <v-btn @click="handleLogout()" class="logout-button" color="red"
    >Logout</v-btn
  >
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.logout-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 0;
  height: 50px;
}
</style>
