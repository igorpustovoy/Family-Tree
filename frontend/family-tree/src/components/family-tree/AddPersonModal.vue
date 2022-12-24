<script setup lang="ts">
import { ref } from "vue";
import AddPersonForm from "./add-person-form/AddPersonForm.vue";

const dialog = ref(false);
</script>

<template>
  <v-dialog class="person-dialog" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Add User </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <AddPersonForm />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.person-dialog {
  max-width: 500px;
}
</style>
