import { ref } from "vue";

export const registerFormModel = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

export const registerFormRules = {
  username: [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length >= 3) || "Name must be at least 3 characters",
    (v: string) =>
      (v && v.length <= 12) || "Name must be less than 12 characters",
  ],
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
  ],
  password: [
    (v: string) => !!v || "Password is required",
    (v: string) =>
      (v && v.length >= 8) || "Password must be at least 8 characters",
    (v: string) =>
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/.test(v) ||
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  ],
  confirmPassword: [
    (v: string) => !!v || "Password confirmation is required",
    (v: string) =>
      v === registerFormModel.value.password ||
      "Password confirmation must match password",
  ],
};
