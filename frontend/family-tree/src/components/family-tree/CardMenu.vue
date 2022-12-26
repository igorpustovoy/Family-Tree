<script setup lang="ts">
import { ref } from "vue";
import AddPersonModal from "./AddPersonModal.vue";

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="button" color="transparent" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item class="list-item">
          <div class="list-item__info">
            <v-icon>mdi-ring</v-icon>
            <div>Add Spouse</div>
          </div>
        </v-list-item>
        <v-list-item class="list-item">
          <div class="list-item__info">
            <v-icon>mdi-account-multiple-plus</v-icon>
            <div>Add Child</div>
          </div>
          <AddPersonModal type="child" :id="props.id" />
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
  .list-item__info {
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
