// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    console.log('getting profile... client/auth:js:8-getProfile()');
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    console.log('attempting login... client/auth:js15-loggedIn()')
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      console.log('verifying token... client/auth:js23-isTokenExpired()');
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    console.log('getting token... client/auth.js:35-getToken()');
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    console.log('attempting to login with idToken client/auth.js:41-login(idToken)')
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    console.log('attempting logout client/auth.js:48-logout()');
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();