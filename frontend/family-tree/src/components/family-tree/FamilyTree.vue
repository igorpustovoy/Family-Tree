<script setup lang="ts">
import VueFamilyTree from "@/components/family-tree/tree-view/VueFamilyTree.vue";
import tree from "@/assets/testTree";

const handleCardClick = (person: any) => {
  console.log(person);
};
</script>

<template>
  <VueFamilyTree :tree="tree" @card-click="handleCardClick" />
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
