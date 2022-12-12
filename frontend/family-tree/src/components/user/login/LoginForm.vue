<script setup lang="ts">
import { ref } from "vue";
import { loginFormModel, loginFormRules } from "./login-validation";

const isFormValid = ref(false);

const formModel = loginFormModel;

const formRules = loginFormRules;
</script>

<template>
  <h2>Login</h2>
  <v-divider></v-divider>
  <v-form class="login-form" v-model="isFormValid">
    <v-text-field
      density="comfortable"
      v-model="formModel.email"
      :rules="formRules.email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      density="comfortable"
      v-model="formModel.password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-btn> Login </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
}
</style>
