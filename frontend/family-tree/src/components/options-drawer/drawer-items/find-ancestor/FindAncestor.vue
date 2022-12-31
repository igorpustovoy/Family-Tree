<script setup lang="ts">
import axios from "@/api/axios";
import type IFoundAncestor from "@/models/IFoundAncestor";
import { ref } from "vue";
import AncestorList from "./AncestorList.vue";

const loading = ref(false);

const phrase = ref("");
const hasFetched = ref(false);

const ancestorsFound = ref<IFoundAncestor[]>([]);

const handleEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleFindAncestors();
  }
};

window.addEventListener("keydown", handleEnter);

const handleFindAncestors = async () => {
  if (phrase.value.length < 3) return;

  loading.value = true;
  try {
    const result = await axios.get("/family-tree/find-ancestor", {
      params: {
        phrase: phrase.value,
      },
    });

    ancestorsFound.value = result.data.people;

    loading.value = false;
    hasFetched.value = true;
  } catch (error) {
    console.error(error);
    loading.value = false;
    hasFetched.value = true;
  }
};
</script>

<template>
  <v-card class="mx-auto" color="grey-darken-3" max-width="400">
    <v-card-text>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Enter your ancestor's name..."
        append-inner-icon="mdi-magnify"
        single-line
        :counter="3"
        v-model="phrase"
        @click:append-inner="handleFindAncestors()"
      ></v-text-field>
    </v-card-text>
  </v-card>
  <AncestorList
    class="ancestor-list"
    v-if="ancestorsFound.length"
    :ancestors="ancestorsFound"
  />
  <div class="no-ancestor-found" v-if="!ancestorsFound.length && hasFetched">
    No ancestors found
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.no-ancestor-found {
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
}
.ancestor-list {
  margin-top: 20px;
}
</style>
