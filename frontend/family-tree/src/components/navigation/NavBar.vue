<script setup lang="ts">
import UserModal from "@/components/user/UserModal.vue";
import axios from "@/api/axios";
import useAuthStore from "@/stores/AuthStore";
import useDrawerStore from "@/stores/DrawerStore";

const auth = useAuthStore();
const drawer = useDrawerStore();

const handleLogout = async () => {
  try {
    await axios.get("/users/logout");

    auth.clearAuth();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="navbar">
    <div class="navbar__logo">
      <v-icon @click="drawer.toggleDrawer()" size="x-large">mdi-menu</v-icon>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="60"
        height="60"
      />
    </div>
    <div class="navbar__links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/tree">Tree</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <UserModal v-if="!auth.isAuthenticated" />
      <v-btn v-if="auth.isAuthenticated" color="red" @click="handleLogout()"
        >Logout</v-btn
      >
    </div>
  </div>
  <v-divider color="light" />
</template>

<style scoped lang="scss">
@import "@/assets/_variables.scss";
.navbar {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  width: 100%;
  background-color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  img {
    margin-left: 2rem;
  }
  .navbar__links {
    margin-right: 2rem;
    display: flex;
    align-items: center;
    a {
      margin-right: 1rem;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
