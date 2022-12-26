import { reactive } from "vue";

export const addPersonFormModel = reactive({
  name: "",
});

export const addPersonFormRules = {
  name: [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length >= 3) || "Name must be at least 3 characters",
  ],
};
