type NestedObject<T> = {
  [key: string]: T | NestedObject<T>;
};
// 数组去重
export function uniqueArray(array: any[]) {
  return [...new Set(array)];
}
// 数组是否包含另一个数组
export function hasAllElements(arr1, arr2) {
  return arr2.every((element) => arr1.includes(element));
}

// 判断对象值是否包含另一个数组
export function hasAllElementsByObject(obj, arr) {
  const values = Object.values(obj);
  return values.every((item) => hasAllElements(item, arr));
}

// 深度对比数组是否相同
export function arraysOfObjectsAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const objCount = new Map();

  // 计算 arr1 中每种对象的出现次数
  for (const obj of arr1) {
    const key = JSON.stringify(obj);
    objCount.set(key, (objCount.get(key) || 0) + 1);
  }

  // 检查 arr2 中的对象是否与 arr1 中的对象相等
  for (const obj of arr2) {
    const key = JSON.stringify(obj);
    const count = objCount.get(key);

    if (!count) {
      return false;
    }

    if (count === 1) {
      objCount.delete(key);
    } else {
      objCount.set(key, count - 1);
    }
  }

  return true;
}
// 深度对比对象是否相同
export function deepEqual(obj1, obj2) {
  // 如果两个对象引用相同，它们肯定相等
  if (obj1 === obj2) {
    return true;
  }
  // 如果两个对象的类型不相同，它们不相等
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // 如果两个对象是基本数据类型，并且值相等，它们相等
  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  // 获取两个对象的属性名称
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 如果属性数量不同，它们不相等
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 检查每个属性是否相等
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 如果所有属性都相等，则两个对象相等
  return true;
}

const areArraysEqual = (arr1, arr2) => {
  const sortedArr1 = arr1.sort((a, b) => {
    if (a.standardColumnId && b.standardColumnId) {
      return a.standardColumnId - b.standardColumnId;
    } else {
      return a - b;
    }
  });
  const sortedArr2 = arr2.sort((a, b) => {
    if (a.standardColumnId && b.standardColumnId) {
      return a.standardColumnId - b.standardColumnId;
    } else {
      return a - b;
    }
  });
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
};

export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key in obj1) {
    if (obj1[key] && obj2[key]) {
      if (!areArraysEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};
