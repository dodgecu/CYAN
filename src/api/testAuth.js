export class Auth {
  constructor() {
    this.authenticated = false;
  }

  logIn(callback) {
    this.authenticated = true;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
