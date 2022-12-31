<script setup lang="ts">
import type IFoundAncestor from "@/models/IFoundAncestor";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps<{
  ancestors: IFoundAncestor[];
}>();
</script>

<template>
  <div class="ancestor-list">
    <div
      class="ancestor-list__ancestor"
      v-for="(ancestor, index) in ancestors"
      :key="index"
    >
      <div class="ancestor-list__content">
        <div class="ancestor-list__info">
          <v-avatar size="40" :class="`elevation-4`">
            <v-img
              :src="`https://i.pravatar.cc/50?u=${ancestor.ancestor.id}`"
              alt="avatar"
            ></v-img>
          </v-avatar>
          <div class="ancestor-list-info__ancestor">
            <div class="ancestor-list-info__ancestor__name">
              {{ ancestor.ancestor.name }}
            </div>
            <div class="ancestor-list-info__tree-owner">
              {{ ancestor.treeOwner }}'s family tree
            </div>
          </div>
        </div>
        <v-btn
          @click="router.push(`/tree/${ancestor.treeOwner}`)"
          size="40px"
          class="ma-2"
          color="none"
          icon="mdi-graph-outline"
        >
        </v-btn>
      </div>
      <v-divider class="divider"></v-divider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.ancestor-list {
  .ancestor-list__ancestor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .divider {
      width: 100%;
    }
    .ancestor-list__content {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .ancestor-list__info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        .ancestor-list-info__ancestor {
          display: flex;
          flex-direction: column;
          gap: 4px;
          .ancestor-list-info__tree-owner {
            color: $text-color-grey;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}
</style>
