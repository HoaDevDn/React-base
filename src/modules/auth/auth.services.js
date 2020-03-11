import firebase from 'firebase/app';

export default class Auth {
  async login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().currentUser;
  }

  logout() {
    return firebase.auth().signOut();
  }

  async register(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return firebase.auth().currentUser.sendEmailVerification();
  }

  getAuth(callback) {
    return firebase.auth().onAuthStateChanged(currentUser => {
      callback(currentUser);
    });
  }
}
