<script setup lang="ts">
import axios from "@/api/axios";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import { ref } from "vue";
import {
  addPersonFormModel,
  addPersonFormRules,
} from "./add-person-validation";

const emit = defineEmits(["close-modal"]);

const props = defineProps<{
  id: string;
  type: "spouse" | "child";
}>();

const tree = useFamilyTreeStore();

const isFormValid = ref(false);

const isSubmitting = ref(false);

const formModel = addPersonFormModel;

const formRules = addPersonFormRules;

const handleAddPerson = async () => {
  if (!isFormValid.value) {
    return;
  }
  isSubmitting.value = true;
  try {
    const url =
      props.type === "spouse"
        ? "/family-tree/add-spouse"
        : "/family-tree/add-descendant";

    const response = await axios.post(url, {
      name: formModel.name,
      relativeId: props.id,
    });

    if (props.type === "spouse") {
      tree.addSpouse(props.id, response.data.person);
    } else {
      tree.addChild(props.id, response.data.person);
    }

    emit("close-modal");

    formModel.name = "";
  } catch (error) {
    console.log(error);
  }
  isSubmitting.value = false;
};
</script>

<template>
  <h2 class="form-title" v-if="type === 'spouse'">Enter the spouse's name</h2>
  <h2 class="form-title" v-else>Enter the child's name</h2>
  <v-divider class="form-divider"></v-divider>
  <v-form
    v-on:submit.prevent="handleAddPerson()"
    class="add-person-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <v-text-field
      density="comfortable"
      v-model="formModel.name"
      label="Enter person's name..."
      required
      :rules="formRules.name"
    ></v-text-field>

    <v-btn :disabled="!isFormValid || isSubmitting" type="submit">
      {{ props.type === "spouse" ? "Add Spouse" : "Add Child" }}
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
.form-title {
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: 500;
}
.form-divider {
  margin-bottom: 30px;
}
.add-person-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
