<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/navigation/NavBar.vue";
import OptionsDrawer from "./components/options-drawer/OptionsDrawer.vue";
import ActiveConversations from "./components/user/active-conversations/ActiveConversations.vue";
import useAuthStore from "./stores/AuthStore";
import useDrawerStore from "./stores/DrawerStore";
import useFamilyTreeStore from "./stores/FamilyTreeStore";
import TreeView from "./views/TreeView.vue";

const auth = useAuthStore();
const drawer = useDrawerStore();
const tree = useFamilyTreeStore();

const { isAuthenticated } = storeToRefs(auth);

watchEffect(() => {
  if (isAuthenticated.value) {
    drawer.initialize();
    tree.fetchFamilyTree();
  }
});
</script>

<template>
  <v-app theme="dark">
    <div v-if="auth.hasRequestedAuth">
      <NavBar />
      <ActiveConversations class="active-conversations" />
      <OptionsDrawer />
      <RouterView />
    </div>
    <!-- <div class="loading-screen" v-else>
    <div>Please wait...</div>
    <v-progress-linear indeterminate color="teal"></v-progress-linear>
  </div> -->
  </v-app>
</template>

<style lang="scss" scoped>
.active-conversations {
  position: fixed;
  bottom: 0;
  left: 400px;
  display: flex;
  gap: 20px;
}
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
