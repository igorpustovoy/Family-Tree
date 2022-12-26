<script setup lang="ts">
import { ref } from "vue";
import AddPersonForm from "./add-person-form/AddPersonForm.vue";

const props = defineProps<{
  id: string;
  type: "spouse" | "child";
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
          @close-modal="closeModal()"
          :type="props.type"
          :id="props.id"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.person-dialog {
  max-width: 500px;
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
