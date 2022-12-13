import { reactive } from "vue";

export const loginFormModel = reactive({
  email: "",
  password: "",
});

export const loginFormRules = {
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
  ],
};
