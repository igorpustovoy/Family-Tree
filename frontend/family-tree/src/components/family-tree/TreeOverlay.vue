<script setup lang="ts">
import useAuthStore from "@/stores/AuthStore";
import { inject } from "vue";
import type { Ref } from "vue";

const auth = useAuthStore();
const treeOwner: Ref<string> = inject("treeOwner") as Ref<string>;

const authorText =
  auth.username === treeOwner.value ? "your" : `${treeOwner.value}'s`;
</script>

<template>
  <div class="tree-overlay">
    <div class="tree-overlay__author">
      You are viewing {{ authorText }} family tree.
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.tree-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  .tree-overlay__author {
    position: absolute;
    top: 80px;
    left: 30px;
    font-size: 1.2rem;
    font-weight: 500;
    @media (max-width: 400px) {
      top: 120px;
    }
  }
}
</style>
