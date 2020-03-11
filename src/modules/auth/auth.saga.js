import { takeEvery, put } from 'redux-saga/effects';
import { SET_USER, LOGIN, LOGOUT } from './auth.types';
import AuthService from './auth.services';

const authService = new AuthService();

function* login(action) {
  const { email, password, callbackSuccess, callbackFail } = action.data;

  try {
    const user = yield authService.login(email, password);
    if (user.emailVerified) yield put({ type: SET_USER, user });
    callbackSuccess(user);
  } catch (error) {
    callbackFail();
  }
}

function* logout(action) {
  const { callbackSuccess, callbackFail } = action.data;

  try {
    yield authService.logout();
    callbackSuccess();
  } catch (error) {
    callbackFail(error);
  }
}

export function* authSaga() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(LOGOUT, logout);
}
