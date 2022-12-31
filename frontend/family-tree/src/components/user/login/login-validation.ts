import { reactive } from "vue";

export const loginFormModel = reactive({
  email: "",
  password: "",
});

export const loginFormRules = {
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid",
  ],
  password: [(v: string) => !!v || "Password is required"],
};
