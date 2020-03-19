import firebase from 'firebase/app';
import BaseGraphQL from 'services/graphQL/base';
import { rConfig } from 'configs';
import { MUTATE_CREATE_USER } from './Users.graphql-tag';

export default class Auth extends BaseGraphQL {
  constructor() {
    super();
    this.userListeners = null;
  }

  async getListUser() {
    const response = await firebase
      .firestore()
      .collection('users')
      .orderBy('name')
      .limit(10)
      .get();

    if (!response) return [];
    return response.docs.map(doc => doc.data());
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

  async updateUser(id, data, role = 'teacher') {
    const usersRef = firebase.firestore().doc(`users/${id}`);
    const subRef = firebase.firestore().doc(`teachers/${id}`);
    const batch = firebase.firestore().batch();

    Object.keys(data).forEach(item => {
      const obj = {};
      obj[item] = data[item];
      batch.update(usersRef, obj);
      if (role !== rConfig.role.teacher) batch.update(subRef, obj);
    });

    return batch.commit();
  }

  async deleteUser(id, role = 'teacher') {
    const usersRef = firebase.firestore().doc(`users/${id}`);
    let subRef = firebase.firestore().doc(`teachers/${id}`);
    if (role !== rConfig.role.teacher) subRef = firebase.firestore().doc(`learners/${id}`);
    const batch = firebase.firestore().batch();
    batch.delete(usersRef);
    batch.delete(subRef);
    return batch.commit();
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
