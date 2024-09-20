import { AppRouteRecordRaw } from "./types";
import { RLayout } from "/@/layout/index";
const routes: AppRouteRecordRaw[] = [
  {
    path: "/package",
    name: "Package",
    component: RLayout,
    children: [
      {
        name: "PackageList",
        path: "",
        component: () => import("/@/views/package-list/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/shop",
    name: "Shop",
    component: RLayout,
    children: [
      {
        name: "ShopManage",
        path: "",
        component: () => import("/@/views/shop-manage/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/recharge",
    component: RLayout,
    redirect: "/recharge",
    name: "Recharge",
    children: [
      {
        name: "RechargeAndRenew",
        path: "",
        component: () => import("/@/views/recharge/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/user",
    component: RLayout,
    redirect: "/user",
    name: "User",
    children: [
      {
        name: "UserProfile",
        path: "",
        component: () => import("/@/views/user-profile/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/term",
    component: () => import("/@/views/login/term/index.vue"),
    name: "Term",
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/policy",
    component: () => import("/@/views/login/policy/index.vue"),
    name: "Policy",
    meta: {
      requiresAuth: false,
    },
  },
];

export default routes;
