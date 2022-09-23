import axios from "axios";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.checkLog()
      .then((response) => {
        console.log(response);
        this.authenticated = true;
        console.log(this.authenticated);
      })
      .catch((error) => {
        console.log(error.response.data);
        this.authenticated = false;
        console.log(this.authenticated);
      });
  }

  logout() {
    axios.get("http://localhost:4000/authLogout", {
      withCredentials: true,
    });

    this.authenticated = false;
  }

  isAuthenticated() {
    this.login();

    return this.authenticated;
  }

  async checkLog() {
    const response = await axios.get("http://localhost:4000/authRequest", {
      withCredentials: true,
    });
    return response;
  }
}

export default new Auth();
