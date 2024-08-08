import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    console.log('getting profile... client/auth:js:8-getProfile()');
    return decode(this.getToken());
  }

  loggedIn() {
    console.log('attempting login... client/auth:js15-loggedIn()')
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

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
    console.log('getting token... client/auth.js:35-getToken()');
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    console.log('attempting to login with idToken client/auth.js:41-login(idToken)')
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    console.log('attempting logout client/auth.js:48-logout()');
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();