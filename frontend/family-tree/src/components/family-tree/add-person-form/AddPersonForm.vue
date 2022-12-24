<script setup lang="ts">
import axios from "@/api/axios";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import { ref } from "vue";
import {
  addPersonFormModel,
  addPersonFormRules,
} from "./add-person-validation";

const tree = useFamilyTreeStore();

const names = tree.getNameList();

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
    const response = await axios.post("/family-tree/add-person", formModel);

    console.log(response.data);

    tree.addPerson(response.data.person);
  } catch (error) {
    console.log(error);
  }
  isSubmitting.value = false;
};
</script>

<template>
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

    <v-autocomplete
      label="Select relative..."
      :items="names"
      :rules="formRules.relative"
      v-model="formModel.relative"
    ></v-autocomplete>

    <v-select
      label="Who is your person to the relative?"
      :items="['Child', 'Parent']"
      :rules="formRules.relationType"
      v-model="formModel.relationType"
    ></v-select>

    <v-btn :disabled="!isFormValid || isSubmitting" type="submit">
      Add Person
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
.add-person-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
