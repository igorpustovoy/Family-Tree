import { reactive } from "vue";

export const firstPersonFormModel = reactive({
  name: "",
});

// export const loginFormRules = {
//   email: [
//     (v: string) => !!v || "E-mail is required",
//     (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
//   ],
// };
