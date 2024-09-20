import type { Router } from "vue-router";
import { localStorage } from "/@/utils/use";
import { TOKEN_KEY, USER_KEY } from "/@/constant/AppEnum";
import { PageEnum } from "../constant/PageEnum";
//控制是否登录
export function createLoginGuard(router: Router) {
  // router.beforeEach((to, from, next) => {
  //   if (to.meta.requiresAuth && !localStorage.getItem(TOKEN_KEY)) {
  //     const encodePath = encodeURIComponent(to.fullPath);
  //     console.log(111);
  //     next(`/login?destination=${encodePath}`);
  //     return;
  //   }
  //   next();
  // });
}

//控制登录后前往原本路由
export function createDestinationGuard(router: Router) {
  // router.beforeEach((to, from, next) => {
  //   const destination = from.query.destination;
  //   if (
  //     destination &&
  //     to.path !== PageEnum.BASE_LOGIN &&
  //     destination !== to.fullPath
  //   ) {
  //     next(destination as string);
  //   } else {
  //     next();
  //   }
  // });
}

export function createStateGuard(router: Router) {
  // router.afterEach((to) => {
  //   if (to.path === PageEnum.BASE_LOGIN) {
  //     localStorage.removeItem(TOKEN_KEY);
  //     localStorage.removeItem(USER_KEY);
  //     localStorage.removeItem("visitorId");
  //   }
  // });
}

//控制登录后是否有权限
