<script setup lang="ts">
import axios from "@/api/axios";
import { ref } from "vue";
import { computed } from "vue";

const props = defineProps<{
  chatUrl: string;
  recipient?: string;
  type: "global" | "private";
}>();

const message = ref("");
const isDisabled = ref(false);

const sendMessage = async () => {
  if (message.value === "" || isDisabled.value) {
    return;
  }

  isDisabled.value = true;
  try {
    await axios.post(props.chatUrl, {
      message: message.value,
      recipient: props.recipient,
    });
    message.value = "";
  } catch (error) {
    console.error(error);
  }
  isDisabled.value = false;
};

const isPrivate = computed(() => props.type === "private");
</script>

<template>
  <v-divider></v-divider>
  <div class="chat-input" :class="{ 'private-chat': isPrivate }">
    <v-text-field
      v-if="isPrivate"
      v-model="message"
      label="Enter a message..."
      variant="underlined"
      :hide-details="true"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="message"
      label="Enter a message..."
      variant="underlined"
    ></v-text-field>
    <v-btn
      v-if="isPrivate"
      class="button"
      icon="mdi-send"
      :disabled="isDisabled || message === ''"
      @click="sendMessage()"
      color="none"
      max-width="40px"
      max-height="30px"
    ></v-btn>
    <v-btn
      v-else
      class="button"
      append-icon="mdi-send"
      :disabled="isDisabled || message === ''"
      @click="sendMessage()"
      >Send</v-btn
    >
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.chat-input {
  .button {
    color: white;
    background-color: $theme-color;
    width: 100%;
  }
}
.private-chat {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 5px;
  padding: 10px;
  padding-top: 0;
  .button {
    border-radius: 0;
    background-color: $theme-color;
  }
}
</style>
