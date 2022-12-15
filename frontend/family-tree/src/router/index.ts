import useAuthStore from "@/stores/AuthStore";
import TreeView from "@/views/TreeView.vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/tree",
      name: "tree",
      component: TreeView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to: RouteLocationNormalized) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated)
    return {
      name: "",
      // query: {
      //   redirectTo: to.fullPath,
      // },
    };
  return true;
});

export default router;
