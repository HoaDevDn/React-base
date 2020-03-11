import { en } from 'locale/en';
import { vi } from 'locale/vi';

const lang = { en, vi };

export function getRules(props, inputName, rule = '', type = '') {
  const obj = {};
  let message = '';

  if (type) {
    obj.type = type;
    message = lang[props.i18n.language].types[type];
  } else {
    obj[rule] = true;
    message = lang[props.i18n.language].rules[rule];
  }

  obj.message = `${inputName} ${message}`;
  return obj;
}
