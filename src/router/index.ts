import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import type { Router } from "vue-router";
import { basicRoutes } from "./basic";
import routes from "./routes";
import {
  createLoginGuard,
  createDestinationGuard,
  createStateGuard,
} from "./guard";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.concat(basicRoutes) as unknown as RouteRecordRaw[],
});

export function setupRouter(app: any) {
  app.use(router);
}

export function setupRouterGuard(router: Router) {
  createLoginGuard(router);
  createDestinationGuard(router);
  createStateGuard(router);
}
