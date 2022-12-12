<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import RegisterForm from "./register/RegisterForm.vue";
import LoginForm from "./login/LoginForm.vue";

const dialog = ref(false);

const tab: Ref<"login" | "register"> = ref("login");

const swapTabs = () => {
  tab.value = tab.value === "login" ? "register" : "login";
};
</script>

<template>
  <div class="text-center">
    <v-dialog class="user-dialog" v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <LoginForm v-if="tab === 'login'" />
          <RegisterForm v-if="tab === 'register'" />
          <v-divider></v-divider>
          <div class="swap-tabs">
            <div class="swap-text" v-if="tab === 'login'">
              Don't have an account?
            </div>
            <div class="swap-button" v-if="tab === 'login'" @click="swapTabs">
              Sign up!
            </div>

            <div class="swap-text" v-if="tab === 'register'">
              Already have an account?
            </div>
            <div
              class="swap-button"
              v-if="tab === 'register'"
              @click="swapTabs"
            >
              Sign in!
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.user-dialog {
  max-width: 500px;
}
.swap-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  .swap-button {
    color: $theme-color;
    cursor: pointer;
  }
}
</style>
