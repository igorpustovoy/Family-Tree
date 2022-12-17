<script setup lang="ts">
import MessageInput from "@/components/shared/MessageInput.vue";
import MessageBox from "@/components/shared/MessageBox.vue";
import useDrawerStore from "@/stores/DrawerStore";

console.log("global chat");

const drawerStore = useDrawerStore();

const messages = drawerStore.globalMessages;

// const isFetching = ref(true);

// onMounted(async () => {
//   try {
//     const response = await axios.get("/global-chat");

//     messages.value = response.data.messages;

//     setTimeout(() => {
//       isFetching.value = false;
//     }, 700);
//   } catch (error) {
//     console.error(error);
//   }
// });

console.log(messages);
</script>

<template>
  <div className="chat-container">
    <MessageBox :messages="messages" />
    <MessageInput chatUrl="/global-chat" />
  </div>
  <!-- <v-progress-linear
    progress-linear-indeterminate-animation-duration="1s"
    v-else
    indeterminate
    color="yellow-darken-2"
  ></v-progress-linear> -->
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
