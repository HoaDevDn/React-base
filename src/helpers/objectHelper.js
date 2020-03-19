import { isEqual, isEmpty } from 'lodash';

export function getValuesChangeTwoObj(oldValue, newValue) {
  const dataChanged = {};
  Object.keys(newValue).forEach(key => {
    if (typeof newValue[key] === 'object') {
      if (!isEqual(newValue[key], oldValue[key])) {
        dataChanged[key] = newValue[key];
      }
    } else if (newValue[key] !== oldValue[key]) {
      dataChanged[key] = newValue[key];
    }
  });
  return isEmpty(dataChanged) ? null : dataChanged;
}
