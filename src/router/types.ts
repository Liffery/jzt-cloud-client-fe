import type {
  RouteRecordRaw,
  RouteMeta,
  RouteRecordNormalized,
} from "vue-router";
import { defineComponent } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name?: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface AppRouteRecordNormalized extends RouteRecordNormalized {
  fullPath?: string;
}

export type Recordable = Object | Boolean | Function;
