<script setup lang="ts">
import useDrawerStore from "@/stores/DrawerStore";
import DrawerProfile from "./DrawerProfile.vue";
import GlobalChat from "./drawer-items/GlobalChat.vue";
import DrawerItem from "./DrawerItem.vue";
import UserList from "./drawer-items/user-list/UserList.vue";
import ConversationList from "./drawer-items/conversation-list/ConversationList.vue";
import LogOutButton from "./drawer-items/LogOutButton.vue";

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
      <DrawerItem title="Users" icon="mdi-account-group">
        <UserList />
      </DrawerItem>
      <DrawerItem title="Conversations" icon="mdi-forum">
        <ConversationList />
      </DrawerItem>
    </v-expansion-panels>
    <LogOutButton />
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
</style>
