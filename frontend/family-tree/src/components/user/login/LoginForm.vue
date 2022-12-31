<script setup lang="ts">
import axios from "@/api/axios";
import useAuthStore from "@/stores/AuthStore";
import { ref } from "vue";
import { loginFormModel, loginFormRules } from "./login-validation";
import type IAuth from "@/models/IAuth";
import type IRequestStatus from "@/models/IRequestStatus";
import RequestStatus from "@/components/shared/RequestStatus.vue";

const loginStatus = ref<IRequestStatus>({
  status: "idle",
  message: "",
});

const auth = useAuthStore();

const isFormValid = ref(false);

const isSubmitting = ref(false);

const formModel = loginFormModel;

const formRules = loginFormRules;

const handleLogin = async () => {
  isSubmitting.value = true;
  loginStatus.value = {
    status: "pending",
    message: "Logging in...",
  };
  if (isFormValid.value) {
    try {
      const response = await axios.post<IAuth>("/users/login", formModel);

      loginStatus.value = {
        status: "success",
        message: "Logged in successfully!",
      };
      setTimeout(() => {
        auth.setAuth(response.data.username, response.data.email);
      }, 1000);
    } catch (error) {
      loginStatus.value = {
        status: "error",
        message: "Incorrect email or password",
      };
      console.error(error);
    }
  }
  isSubmitting.value = false;
};
</script>

<template>
  <h2>Login</h2>
  <v-divider></v-divider>
  <v-form
    v-on:submit.prevent="handleLogin()"
    class="login-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <RequestStatus :requestStatus="loginStatus" />
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
      :rules="formRules.password"
      required
    ></v-text-field>

    <v-btn :disabled="!isFormValid" type="submit"> Login </v-btn>
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
