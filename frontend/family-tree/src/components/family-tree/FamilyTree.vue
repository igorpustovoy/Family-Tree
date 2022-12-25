<script setup lang="ts">
import VueFamilyTree from "@/components/family-tree/tree-view/VueFamilyTree.vue";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";

const treeStore = useFamilyTreeStore();

const handleCardClick = (person: any) => {
  console.log(person);
};
</script>

<template>
  <VueFamilyTree
    :tree="treeStore.getViewableTreeStructure"
    @card-click="handleCardClick"
  />
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
