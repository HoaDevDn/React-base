import firebase from 'firebase/app';

export default class Auth {
  async login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().currentUser;
  }

  logout() {
    return firebase.auth().signOut();
  }

  async register(email, name, password) {
    let user = null;
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const updateName = response.user.updateProfile({
        displayName: name,
      });
      user = { id: response.user.uid, email, name };
      const updateInfo = firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .set(user);
      const sendMail = await firebase.auth().currentUser.sendEmailVerification();
      await Promise.all([updateName, updateInfo, sendMail]);
    } catch (error) {
      if (user && user.id) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.id)
          .delete();
      }
      firebase.auth().currentUser.delete();
      throw error;
    }
  }

  getAuth(callback) {
    return firebase.auth().onAuthStateChanged(currentUser => {
      callback(currentUser);
    });
  }
}
