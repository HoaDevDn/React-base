import firebase from 'firebase/app';
import BaseGraphQL from 'services/graphQL/base';
import { MUTATE_CREATE_USER } from './Home.graphql-tag';

export default class Auth extends BaseGraphQL {
  constructor() {
    super();
    this.userListeners = null;
  }

  async getUser(id) {
    const doc = await firebase
      .firestore()
      .doc(`users/${id}`)
      .get();

    return doc ? { ...doc.data(), id: doc.id } : null;
  }

  async setUserInfo(id, data) {
    const doc = await firebase
      .firestore()
      .doc(`users/${id}`)
      .set(data);
    return doc ? doc.data() : null;
  }

  deleteUser(id) {
    firebase
      .firestore()
      .doc(`users/${id}`)
      .delete();
  }

  createUser(name, email, password) {
    return this.mutate(MUTATE_CREATE_USER, {
      name,
      email,
      password,
    });
  }

  listenEventUsers(callbackSuccess, callbackFail) {
    this.userListeners = firebase
      .firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          callbackSuccess(change);
        });
      }, callbackFail());
  }

  offListenEventUsers() {
    this.userListeners();
  }
}
