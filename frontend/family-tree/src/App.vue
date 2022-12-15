<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/navigation/NavBar.vue";
import useAuthStore from "./stores/AuthStore";

const auth = useAuthStore();

if (!auth.isAuthenticated) {
  auth.authenticate();
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>
