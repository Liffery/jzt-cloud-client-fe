export enum StoreStatusEnum {
  NOT_CERTIFIED = 0,
  PREPARING = 1,
  SERVICING = 2,
  // SERVICE_EXPIRATION = 1,
}

export const storeStatusZh = {
  [StoreStatusEnum.NOT_CERTIFIED]: "准备中",
  [StoreStatusEnum.PREPARING]: "准备中",
  [StoreStatusEnum.SERVICING]: "服务中",
};
