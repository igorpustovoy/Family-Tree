<script setup lang="ts">
import { ref } from "vue";
import { registerFormModel, registerFormRules } from "./register-validation";

const isFormValid = ref(false);

const formModel = registerFormModel;

const formRules = registerFormRules;
</script>

<template>
  <h2>Register</h2>
  <v-divider></v-divider>
  <v-form class="register-form" v-model="isFormValid">
    <v-text-field
      density="comfortable"
      v-model="formModel.username"
      :rules="formRules.username"
      :counter="12"
      label="Username"
      required
    ></v-text-field>

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
      :rules="formRules.password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      density="comfortable"
      v-model="formModel.confirmPassword"
      :rules="formRules.confirmPassword"
      label="Confirm Password"
      type="password"
      required
    ></v-text-field>

    <v-btn> Register </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
}
</style>
