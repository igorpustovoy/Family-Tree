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

const props = defineProps<{
  treeOwner: string;
}>();

const tree = ref<IAncestor[]>([]);
const isOwner = ref(auth.username === props.treeOwner);
console.log("isOwner", isOwner.value);

provide("tree", tree);
provide("treeOwner", props.treeOwner);
provide("isOwner", isOwner);

onMounted(async () => {
  watch(
    () => props.treeOwner,
    async (pathName) => {
      isOwner.value = auth.username === pathName;

      if (isOwner.value === true) {
        tree.value = familyTree.value;

        watchEffect(() => {
          tree.value = familyTree.value;
        });
      } else if (auth.username && pathName) {
        try {
          const response = await axios.get(`/family-tree/${pathName}`);

          tree.value = response.data.people;
        } catch (error) {
          console.error(error);
        }
      }
    }
  );
  if (isOwner.value === true) {
    tree.value = familyTree.value;

    watchEffect(() => {
      tree.value = familyTree.value;
    });
  } else if (auth.username && props.treeOwner) {
    try {
      const response = await axios.get(`/family-tree/${props.treeOwner}`);

      tree.value = response.data.people;
    } catch (error) {
      console.error(error);
    }
  }
});
</script>

<template>
  <main class="family-tree">
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
