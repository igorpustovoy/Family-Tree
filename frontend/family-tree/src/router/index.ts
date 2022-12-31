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
      path: "/tree/:name",
      name: "tree",
      component: TreeView,
      meta: {
        requiresAuth: true,
      },
      props: (route) => ({ treeOwner: route.params.name }),
    },
  ],
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    await auth.authenticate();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated)
    return {
      name: "",
    };
  return true;
});

export default router;
