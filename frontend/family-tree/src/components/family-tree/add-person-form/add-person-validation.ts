import { reactive } from "vue";

export const addPersonFormModel = reactive({
  name: "",
  relative: "",
});

export const addPersonFormRules = {
  name: [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length >= 3) || "Name must be at least 3 characters",
  ],
  relative: [
    (v: string) => !!v || "Relative is required",
    (v: string) =>
      (v && v.length >= 3) || "Relative must be at least 3 characters",
  ],
};
