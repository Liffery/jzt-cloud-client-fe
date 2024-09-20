import { AppRouteRecordRaw } from "./types";
import { PageEnum } from "/@/constant/PageEnum";
import { RLayout } from "/@/layout/index";

const rootRoute: AppRouteRecordRaw = {
  path: PageEnum.BASE_HOME,
  name: "CloudServer",
  redirect: "/recharge",
  meta: {
    requiresAuth: true,
  },
};

export const page404Route: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "PageNotFound",
  meta: {
    requiresAuth: true,
  },
  component: () => import("/@/views/404/index.vue"),
};

export const basicRoutes = [rootRoute, page404Route];
