<script setup lang="ts">
import useDrawerStore from "@/stores/DrawerStore";
import DrawerProfile from "./DrawerProfile.vue";
import GlobalChat from "./global-chat/GlobalChat.vue";
import DrawerItem from "./DrawerItem.vue";

const drawer = useDrawerStore();
</script>

<template>
  <v-navigation-drawer width="400" v-model="drawer.isOpen" temporary>
    <DrawerProfile />
    <v-divider></v-divider>

    <v-expansion-panels variant="accordion">
      <DrawerItem title="Global Chat" icon="mdi-earth">
        <GlobalChat />
      </DrawerItem>
      <DrawerItem title="Users" icon="mdi-account-group"></DrawerItem>
      <DrawerItem title="Messages" icon="mdi-forum"></DrawerItem>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
