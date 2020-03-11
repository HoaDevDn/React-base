import { SET_USER, LOGIN, LOGOUT } from './auth.types';

const setUser = user => ({ type: SET_USER, user });
const login = data => ({ type: LOGIN, data });
const logout = data => ({ type: LOGOUT, data });

export { setUser, login, logout };
