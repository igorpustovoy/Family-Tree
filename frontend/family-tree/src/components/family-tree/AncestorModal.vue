<script setup lang="ts">
import { ref } from "vue";
import AddPersonForm from "./add-person-form/AddPersonForm.vue";
import CopyPersonForm from "./copy-person-form/CopyPersonForm.vue";

type personAddType = "spouse" | "child";

const props = defineProps<{
  id: string;
  type?: personAddType;
  operation: "add" | "copy";
}>();

const dialog = ref(false);

const closeModal = () => {
  dialog.value = false;
};
</script>

<template>
  <v-dialog class="person-dialog" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="transparent" class="button" v-bind="props"></v-btn>
    </template>

    <v-card>
      <v-card-text>
        <AddPersonForm
          v-if="props.operation === 'add'"
          @close-modal="closeModal()"
          :type="(props.type as personAddType)"
          :id="props.id"
        />
        <CopyPersonForm
          v-if="props.operation === 'copy'"
          @close-modal="closeModal()"
          :id="props.id"
          :clicked-person-id="props.id"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.person-dialog {
  max-width: 450px;
}

.button {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-shadow: none;
}
</style>
