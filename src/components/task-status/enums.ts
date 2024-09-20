export enum TaskStatus {
  ALL = 0,
  PROCESSING = 1,
  SUCCESS = 2,
  FAIL = 3,
}

export enum ErrReasonEnum {
  SysException = 1,
  ReasonTimeOut = 2,
}

export const ErrReasonZh = {
  [ErrReasonEnum.SysException]: "系统异常，请重新尝试创建。",
  [ErrReasonEnum.ReasonTimeOut]: "结果超时，请重新尝试创建。",
};
