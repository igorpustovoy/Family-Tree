<script setup lang="ts">
import { firstPersonFormModel } from "./first-person-validation";
import { ref } from "vue";
import axios from "@/api/axios";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";

const formModel = firstPersonFormModel;

const isSubmitting = ref(false);

const isFormValid = ref(false);

const tree = useFamilyTreeStore();

const handleAddFirstPerson = async () => {
  if (isFormValid.value) {
    isSubmitting.value = true;
    try {
      const response = await axios.post("/family-tree", formModel);

      const person = response.data.person;

      tree.addPerson(person);
    } catch (error) {
      console.error(error);
    } finally {
      isSubmitting.value = false;
    }
  }
};
</script>

<template>
  <v-form
    v-on:submit.prevent="handleAddFirstPerson()"
    class="first-person-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <h2 class="form-title">Add a first person to your tree:</h2>
    <v-text-field
      class="text-field"
      v-model="formModel.name"
      label="Enter person name..."
      required
    ></v-text-field>
    <v-btn class="form-button" :disabled="isSubmitting" type="submit">
      Add Person
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.first-person-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  gap: 30px;
  padding: 20px 60px;
  border: 4px solid $background-color-secondary;
  .text-field {
    width: 100%;
  }
  .form-title {
    font-size: 1.3rem;
    font-weight: 500;
  }
  .form-button {
    width: 100%;
  }
}
</style>
