<script setup lang="ts">
import FamilyTree from "@/components/family-tree/FamilyTree.vue";
import FirstPersonForm from "@/components/family-tree/first-person-form/FirstPersonForm.vue";
import OptionsBar from "@/components/family-tree/OptionsBar.vue";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import { storeToRefs } from "pinia";

const tree = useFamilyTreeStore();

const { familyTree } = storeToRefs(tree);

console.log(familyTree);
</script>

<template>
  <main class="family-tree">
    <OptionsBar class="options-bar" />
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
  .options-bar {
    position: absolute;
    top: 250px;
    right: 40px;
  }
}
</style>
