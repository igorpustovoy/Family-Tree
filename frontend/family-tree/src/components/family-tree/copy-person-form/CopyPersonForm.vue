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
import type IRequestStatus from "@/models/IRequestStatus";
import RequestStatus from "@/components/shared/RequestStatus.vue";

const requestStatus = ref<IRequestStatus>({
  status: "idle",
  message: "",
});

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

const handleCopyPerson = async () => {
  if (!isFormValid.value) {
    return;
  }
  isSubmitting.value = true;
  requestStatus.value = {
    status: "pending",
    message: "Copying descendants...",
  };
  try {
    const newParentId = tree.familyTree.find(
      (person) => person.name === formModel.name
    )?.id;

    await axios.post("/family-tree/copy-branch", {
      rootPersonId: props.clickedPersonId,
      newParentId: newParentId,
      sourceTreeOwner: treeOwner.value,
    });

    requestStatus.value = {
      status: "success",
      message: "Copied descendants successfully!",
    };

    setTimeout(() => {
      router.push(`/tree/${auth.username}`);
      tree.fetchFamilyTree();
      emit("close-modal");
      formModel.name = "";
    }, 1000);
  } catch (error) {
    requestStatus.value = {
      status: "error",
      message: "Something went wrong",
    };
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
    <h2>Choose this person's equivalent from your own tree:</h2>
    <v-divider class="divider"></v-divider>
    <RequestStatus :requestStatus="requestStatus" />
    <v-autocomplete
      label="Select parent..."
      :items="tree.getCorrectCopyPeople"
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
  gap: 30px;
}
</style>
