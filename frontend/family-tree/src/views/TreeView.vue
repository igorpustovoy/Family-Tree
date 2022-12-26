<script setup lang="ts">
import FamilyTree from "@/components/family-tree/FamilyTree.vue";
import FirstPersonForm from "@/components/family-tree/first-person-form/FirstPersonForm.vue";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import { storeToRefs } from "pinia";

const tree = useFamilyTreeStore();

const { familyTree } = storeToRefs(tree);
</script>

<template>
  <main class="family-tree">
    <FirstPersonForm class="add-first-person" v-if="!familyTree.length" />
    <FamilyTree v-else />
    <!-- <section v-else>
      {{ familyTree }}
    </section> -->
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.family-tree {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
