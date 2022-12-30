<script setup lang="ts">
import FamilyTree from "@/components/family-tree/FamilyTree.vue";
import FirstPersonForm from "@/components/family-tree/first-person-form/FirstPersonForm.vue";
import useAuthStore from "@/stores/AuthStore";
import useFamilyTreeStore from "@/stores/FamilyTreeStore";
import { storeToRefs } from "pinia";
import { watch, ref, watchEffect, onMounted, provide } from "vue";
import axios from "@/api/axios";
import type IAncestor from "@/models/IAncestor";

const treeStore = useFamilyTreeStore();
const { familyTree } = storeToRefs(treeStore);
const auth = useAuthStore();

const hasFetchedTree = ref(false);

const props = defineProps<{
  treeOwner: string;
}>();

const tree = ref<IAncestor[]>([]);
const owner = ref(props.treeOwner);
const isOwner = ref(auth.username === props.treeOwner);
console.log("isOwner", isOwner.value);

console.log("PROPS", props.treeOwner);

provide("tree", tree);
provide("isOwner", isOwner);
provide("treeOwner", owner);

onMounted(async () => {
  console.log(props.treeOwner);
  watch(
    () => props.treeOwner,
    async (pathName) => {
      hasFetchedTree.value = false;
      isOwner.value = auth.username === pathName;
      owner.value = pathName;

      if (isOwner.value === true) {
        tree.value = familyTree.value;

        watchEffect(() => {
          tree.value = familyTree.value;
        });

        hasFetchedTree.value = true;
      } else if (auth.username && pathName) {
        try {
          const response = await axios.get(`/family-tree/${pathName}`);

          tree.value = response.data.people;

          hasFetchedTree.value = true;
        } catch (error) {
          console.error(error);
        }
      }
    }
  );
  if (isOwner.value === true) {
    tree.value = familyTree.value;
    hasFetchedTree.value = true;
    watchEffect(() => {
      tree.value = familyTree.value;
    });
  } else if (auth.username && props.treeOwner) {
    try {
      const response = await axios.get(`/family-tree/${props.treeOwner}`);

      tree.value = response.data.people;

      hasFetchedTree.value = true;
    } catch (error) {
      console.error(error);
    }
  }
});
</script>

<template>
  <main v-if="hasFetchedTree" class="family-tree">
    <h2 v-if="!isOwner && !tree.length">
      User has not created a family tree yet.
    </h2>
    <FirstPersonForm class="add-first-person" v-if="isOwner && !tree.length" />
    <FamilyTree :tree="tree" v-if="tree.length" />
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
