const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === "[object Array]";
}

export function isNull(obj: any): obj is null {
  return opt.call(obj) === "[object Null]";
}

export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === "[object Boolean]";
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === "[object Object]";
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === "[object String]";
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj;
}

export function isSymbol(obj: any): obj is symbol {
  const type = typeof obj;
  return (
    type == "symbol" ||
    (type === "object" && obj != null && opt.call(obj) == "[object Symbol]")
  );
}

export function isRegExp(obj: any) {
  return opt.call(obj) === "[object RegExp]";
}

export function isDate(obj: any) {
  return opt.call(obj) === "[object Date]";
}
export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === "function";
}
function isHex(color: any) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color: any) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}
function isRgba(color: any) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color);
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}
export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
