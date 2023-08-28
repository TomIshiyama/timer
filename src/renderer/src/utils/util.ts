type OmitType = <T extends object, K extends [...(keyof T)[]]>(
  obj: T,
  ...keys: K
) => {
  [K2 in Exclude<keyof T, K[number]>]: T[K2];
};

export const omit: OmitType = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: (typeof obj)[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }

  return ret;
};

// [...(keyof T)[]] // which can be broke down to:
// keyof T // a union of keys of T
// (keyof T)[] // an array containing keys of T
// [...X] // a tuple that contains X (zero or more arrays like the  described one above)
