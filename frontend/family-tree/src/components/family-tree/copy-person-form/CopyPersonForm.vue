<script setup lang="ts">
import { ref, inject } from "vue";
import axios from "@/api/axios";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import {
  copyPersonFormModel,
  copyPersonFormRules,
} from "./copy-person-validation";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/AuthStore";

const props = defineProps<{
  clickedPersonId: string;
}>();

const emit = defineEmits(["close-modal"]);

const tree = useFamilyTreeStore();
const router = useRouter();
const auth = useAuthStore();

const formModel = copyPersonFormModel;

const formRules = copyPersonFormRules;

const isSubmitting = ref(false);

const isFormValid = ref(false);

const treeOwner: Ref<string> = inject("treeOwner") as Ref<string>;

console.log("TREE OWNER: ", treeOwner.value);

const handleCopyPerson = async () => {
  if (!isFormValid.value) {
    return;
  }
  isSubmitting.value = true;
  try {
    console.log({
      rootPersonId: props.clickedPersonId,
      newParent: formModel.name,
      sourceTreeOwner: treeOwner.value,
    });

    const response = await axios.post("/family-tree/copy-branch", {
      rootPersonId: props.clickedPersonId,
      newParent: formModel.name,
      sourceTreeOwner: treeOwner.value,
    });

    console.log("RESPONSE: ", response.data);
    router.push(`/tree/${auth.username}`);
    tree.fetchFamilyTree();
    emit("close-modal");
    formModel.name = "";
  } catch (error) {
    console.log(error);
  }
  isSubmitting.value = false;
};
</script>

<template>
  <v-form
    v-on:submit.prevent="handleCopyPerson()"
    class="copy-person-form"
    v-model="isFormValid"
    :readonly="isSubmitting"
  >
    <h2>Choose person's parent from your tree:</h2>
    <v-autocomplete
      label="Select parent..."
      :items="tree.getNameList"
      :rules="formRules.name"
      v-model="formModel.name"
    ></v-autocomplete>
    <v-btn :disabled="isSubmitting" type="submit"> Add Person </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.copy-person-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
