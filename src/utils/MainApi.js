class MainApi {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.credentials = 'include';
  }

  async _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    const errorMessage = await res.text();
    const error = new Error(errorMessage);
    error.status = res.status;
    throw error;
  }

  register(userData) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(response => this._checkResponse(response));
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}) 
    })
      .then(response => this._checkResponse(response));
  }

  // TODO: кажется это нужно доделать
  checkToken() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: this.credentials,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => this._checkResponse(response));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: this.credentials,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => this._checkResponse(response));
  }

  setUserInfo({ email, name }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: this.credentials,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, name })

    })
      .then(response => this._checkResponse(response));
  }

  signOut() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'GET',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => this._checkResponse(response));
  }
}

export default MainApi;