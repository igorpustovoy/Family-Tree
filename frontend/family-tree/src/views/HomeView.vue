<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import axios from "@/api/axios";

const testAuth = async () => {
  const res = await axios.get("/users/test", {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  console.log(res);
};
</script>

<template>
  <main>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
    corrupti vitae repellat dolores, eius nulla ut blanditiis quibusdam ipsam
    consequatur quae. Expedita dolore voluptatem similique porro minima
    sapiente, corrupti cumque.
    <v-btn @click="testAuth()">TEST AUTH</v-btn>
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
