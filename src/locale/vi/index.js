import home from './home.json';
import auth from './auth.json';
import rulesTypes from './rules-types.json';
import fields from './fields.json';

const vi = { ...home, ...auth, ...rulesTypes, ...fields };

export { vi };
