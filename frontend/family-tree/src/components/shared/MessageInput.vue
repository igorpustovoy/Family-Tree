<script setup lang="ts">
import axios from "@/api/axios";
import { ref } from "vue";

const props = defineProps<{
  chatUrl: string;
}>();

const message = ref("");
const isDisabled = ref(false);

const sendMessage = async () => {
  isDisabled.value = true;
  try {
    await axios.post(props.chatUrl, {
      message: message.value,
    });
    message.value = "";
  } catch (error) {
    console.error(error);
  }
  isDisabled.value = false;
};
</script>

<template>
  <div>
    <v-text-field
      v-model="message"
      label=""
      variant="underlined"
    ></v-text-field>
    <v-btn
      class="button"
      :disabled="isDisabled"
      @click="sendMessage()"
      color="primary"
      >Send</v-btn
    >
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.button {
  width: 100%;
}
</style>
