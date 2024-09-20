import dayjs from "dayjs";
import { isNull, isNumber } from "../is";
enum TextEnum {
  NULL = "--",
}
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DATE_FORMAT = "YYYY-MM-DD";
const DATE_MINUTE_FORMAT = "YYYY-MM-DD HH:mm";
const DATE_HOUR_FORMAT = "YYYY-MM-DD HH";
const DATE_DOWNLOAD_FORMAT = "YYMMDDHHmm";
const Month_MINUTE_FORMAT = "MM-DD HH:mm";
const WORKFLOW_TIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
const DATE_DOWNLOAD_FORMAT_CSV = "YYYYMMDD";
export function format2Date(time: string | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_FORMAT);
}

export function format2DateMinute(time: string | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_MINUTE_FORMAT);
}

export function format2MonthMinute(time: string | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(Month_MINUTE_FORMAT);
}

export function format2DateHour(time: string | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_HOUR_FORMAT);
}

export function format2DateTime(time: string | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_TIME_FORMAT);
}

function transformSec2Mill(timeStamp: string | number): number {
  if (isNumber(timeStamp)) {
    timeStamp = timeStamp.toFixed();
  }
  return Number(timeStamp.length === 13 ? timeStamp : `${timeStamp}000`);
}

export function format2DownloadTime(time: number | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_DOWNLOAD_FORMAT);
}

export function format2WorkflowTime(time: number | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(WORKFLOW_TIME_FORMAT);
}

export function format2DownloadTimeCsv(time: number | null): string {
  if (isNull(time)) return TextEnum.NULL;
  return dayjs(transformSec2Mill(time)).format(DATE_DOWNLOAD_FORMAT_CSV);
}
