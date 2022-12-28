<script setup lang="ts">
import VueFamilyTree from "@/components/family-tree/tree-view/VueFamilyTree.vue";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import testTree from "@/assets/testTree";
import CardMenu from "./CardMenu.vue";
import type IAncestor from "@/models/IAncestor";
import useViewTree from "@/composables/useViewTree";

defineProps<{
  tree: IAncestor[];
}>();

const handleCardClick = (person: any) => {
  console.log(person);
};
</script>

<template>
  <VueFamilyTree :tree="useViewTree(tree)" @card-click="handleCardClick">
    <template v-slot:card="{ item }">
      <div class="custom-card">
        <v-avatar size="60" :class="`elevation-4`">
          <v-img :src="item.image" alt="avatar"></v-img>
        </v-avatar>
        <div class="custom-card__name">
          {{ item.name }}
        </div>
        <CardMenu class="menu-button" :id="item.id" />
      </div>
    </template>
  </VueFamilyTree>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.custom-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $background-color-secondary;
  gap: 15px;
  width: 110px;
  min-height: 130px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid $background-color-tertiary;
  .custom-card__name {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-weight: 600;
  }

  .menu-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
