<script setup lang="ts">
import { ref } from "vue";
import { registerFormModel, registerFormRules } from "./register-validation";
import axios from "@/api/axios";
import type IAuth from "@/models/IAuth";
import useAuthStore from "@/stores/AuthStore";

const auth = useAuthStore();

const isFormValid = ref(false);

const isSubmitting = ref(false);

const formModel = registerFormModel;

const formRules = registerFormRules;

const handleRegister = async () => {
  isSubmitting.value = true;
  if (isFormValid.value) {
    try {
      const response = await axios.post<IAuth>("/users/register", formModel);

      const user = await axios.post<IAuth>("/users/login", {
        email: response.data.email,
        password: formModel.password,
      });

      auth.setAuth(user.data.username, user.data.email);
    } catch (error) {
      console.error(error);
    }
  }
  isSubmitting.value = false;
};
</script>

<template>
  <h2>Register</h2>
  <v-divider></v-divider>
  <v-form
    v-on:submit.prevent="handleRegister()"
    class="register-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <v-text-field
      density="comfortable"
      v-model="formModel.username"
      :rules="formRules.username"
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
      :counter="8"
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

    <v-btn :disabled="!isFormValid" type="submit"> Register </v-btn>
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
