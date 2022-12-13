<script setup lang="ts">
import { ref } from "vue";
import { registerFormModel, registerFormRules } from "./register-validation";
import axios from "@/api/axios";

const isFormValid = ref(false);

const isSubmitting = ref(false);

const formModel = registerFormModel;

const formRules = registerFormRules;

const handleRegister = async () => {
  isSubmitting.value = true;
  if (isFormValid.value) {
    try {
      const registeredUser = await axios.post("/users/register", formModel);
      console.log(registeredUser);
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
