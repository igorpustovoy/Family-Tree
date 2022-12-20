<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import axios from "@/api/axios";
import useAuthStore from "@/stores/AuthStore";

const testAuth = async () => {
  const res = await axios.get("/users/test", {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  console.log(res);
};

const auth = useAuthStore();
</script>

<template>
  <main>
    <h2 v-if="auth.isAuthenticated">
      Welcome {{ auth.username }} {{ auth.email }}
    </h2>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
}
</style>
