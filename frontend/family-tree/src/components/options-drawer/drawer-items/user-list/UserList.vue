<script setup lang="ts">
import axios from "@/api/axios";
import { ref, onMounted } from "vue";
import type IUser from "@/models/IUser";
import useAuthStore from "@/stores/AuthStore";
import UserTab from "./UserTab.vue";

const isFetching = ref(true);

const users = ref<IUser[]>([]);

const auth = useAuthStore();

onMounted(async () => {
  try {
    const response = await axios.get("/users");

    users.value = response.data.users.filter(
      (user: IUser) => user.username !== auth.username
    );

    setTimeout(() => {
      isFetching.value = false;
    }, 700);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div v-if="!isFetching" class="user-list">
    <div class="user-list__user" v-for="(user, index) in users" :key="index">
      <UserTab :username="user.username" :email="user.email" />
      <v-divider></v-divider>
    </div>
  </div>
  <v-progress-linear
    v-else
    indeterminate
    color="yellow-darken-2"
  ></v-progress-linear>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
