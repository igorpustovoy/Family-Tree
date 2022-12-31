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
  <v-app class="v-app" theme="dark">
    <div v-if="auth.hasRequestedAuth">
      <NavBar />
      <ActiveConversations class="active-conversations" />
      <OptionsDrawer />
      <RouterView />
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.active-conversations {
  position: fixed;
  bottom: 0;
  right: 20px;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
}
</style>
