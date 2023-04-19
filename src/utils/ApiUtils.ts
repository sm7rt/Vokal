/**
 * Get Entity Id from Header
 * @param header
 */
export const getObjectIdFromHeader = (header: any) => {
  if (!header || !header.location) {
    return null;
  }
  const split = header.location.split('/');
  return split[split.length - 1];
};

/**
 * Transform array states = ['PENDING', 'VERIFIED'] to states=PENDING&states=VERIFIED
 * @param params
 */
export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach(key => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach(element => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};
