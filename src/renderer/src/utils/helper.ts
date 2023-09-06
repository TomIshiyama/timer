export function eachParam<T extends object>(obj: T, skip?: (keyof T)[]) {
  return function (callback: (val: T[keyof T]) => unknown): T {
    return Object.entries(obj).reduce<T>((accm, [key, val]) => {
      if (skip?.includes(key as keyof T)) return { ...accm, [key]: val };
      return {
        ...accm,
        [key]: callback(val)
      };
    }, {} as T);
  };
}

// HACK: merge to eachParam on the above.
export function eachParamPick<T extends object>(obj: T, pick?: (keyof T)[]) {
  return function (callback: (val: T[keyof T]) => unknown): T {
    return Object.entries(obj).reduce<T>((accm, [key, val]) => {
      if (pick?.includes(key as keyof T))
        return {
          ...accm,
          [key]: callback(val)
        };
      return { ...accm, [key]: val };
    }, {} as T);
  };
}

export function unixToMinutes<T extends object>(obj: T, pick?: (keyof T)[]): T {
  return eachParamPick(obj, pick)((val) => (typeof val === "number" ? val / 60000 : val));
}

export function minutesToUnix<T extends object>(obj: T, pick?: (keyof T)[]): T {
  return eachParamPick(obj, pick)((val) => (typeof val === "number" ? val * 60000 : val));
}
