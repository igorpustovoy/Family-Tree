<script setup lang="ts">
import type IAncestor from "@/models/IAncestor";
import { computed, inject } from "vue";
import AddPersonModal from "./AddPersonModal.vue";
import type { Ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const familyTree: Ref<IAncestor[]> = inject("tree") as Ref<IAncestor[]>;
const isOwner: Ref<boolean> = inject("isOwner") as Ref<boolean>;

const relative = computed(() => {
  return familyTree.value.find((person) => person.id === props.id);
});
</script>

<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="button" color="transparent" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item v-if="isOwner && !relative?.spouseId" class="list-item">
          <div class="list-item__info">
            <v-icon>mdi-ring</v-icon>
            <div>Add Spouse</div>
          </div>
          <AddPersonModal type="spouse" :id="props.id" />
        </v-list-item>
        <v-list-item v-if="isOwner" class="list-item">
          <div class="list-item__info">
            <v-icon>mdi-account-multiple-plus</v-icon>
            <div>Add Child</div>
          </div>
          <AddPersonModal type="child" :id="props.id" />
        </v-list-item>
        <v-list-item v-if="!isOwner">
          <div class="list-item__info">
            <v-icon>mdi-content-copy</v-icon>
            <div>Copy to your tree</div>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.button {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.list-item {
  position: relative;
  height: 100%;
  width: 100%;
}

.list-item__info {
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
}
</style>
