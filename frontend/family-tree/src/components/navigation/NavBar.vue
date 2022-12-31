<script setup lang="ts">
import UserModal from "@/components/user/UserModal.vue";
import useAuthStore from "@/stores/AuthStore";
import useDrawerStore from "@/stores/DrawerStore";

const auth = useAuthStore();
const drawer = useDrawerStore();
</script>

<template>
  <div class="navbar">
    <div class="navbar__logo">
      <v-icon
        :class="auth.isAuthenticated ? 'menu-icon' : 'menu-icon--disabled'"
        @click="auth.isAuthenticated ? drawer.toggleDrawer() : null"
        size="x-large"
        >mdi-menu</v-icon
      >
      <div class="navbar__website-name">FamilyTree</div>
      <img
        alt="Website logo"
        class="logo"
        src="@/assets/images/logo.png"
        width="40"
        height="40"
      />
    </div>
    <div class="navbar__links">
      <RouterLink class="navbar__link" v-if="auth.isAuthenticated" to="/"
        >Home</RouterLink
      >
      <v-divider
        class="navbar__divider"
        v-if="auth.isAuthenticated"
        vertical
        color="grey lighten-2"
      ></v-divider>
      <RouterLink
        class="navbar__link"
        v-if="auth.isAuthenticated"
        :to="`/tree/${auth.username}`"
        >Tree</RouterLink
      >
      <UserModal v-if="!auth.isAuthenticated" />
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .navbar__logo {
    margin-left: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    .navbar__website-name {
      font-size: 1.5rem;
    }
  }
  .navbar__links {
    margin-right: 2rem;
    display: flex;
    gap: 20px;
    align-items: center;
    height: 40%;
    .navbar__link {
      color: $text-color-grey-light;
      text-decoration: none;
      font-size: 1.05rem;
      &:hover {
        color: $theme-color;
      }
    }
    .navbar__divider {
      height: 100%;
    }
  }
}

.menu-icon--disabled {
  color: rgb(91, 91, 91);
  cursor: default;
}
</style>
