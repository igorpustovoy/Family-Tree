<script setup lang="ts">
import { ref } from "vue";
import axios from "@/api/axios";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";

const tree = useFamilyTreeStore();

const formModel = firstPersonFormModel;

const isSubmitting = ref(false);

const isFormValid = ref(false);
</script>

<template>
  <v-form
    v-on:submit.prevent="handleAddFirstPerson()"
    class="first-person-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <h2>Choose person's parent from your tree:</h2>
    <v-autocomplete
      label="Autocomplete"
      :items="[
        'California',
        'Colorado',
        'Florida',
        'Georgia',
        'Texas',
        'Wyoming',
      ]"
    ></v-autocomplete>
    <v-btn :disabled="isSubmitting" type="submit"> Add Person </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
