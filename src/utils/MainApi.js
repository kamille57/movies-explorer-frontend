class MainApi {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.credentials = 'include';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(error => {
      throw new Error(`Ошибка: ${res.status} - ${error.message}`);
    });
  }

  register({ email, password, name }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(response => this._checkResponse(response));
  }

  authorize({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, name })

    })
      .then(response => this._checkResponse(response));
  }

  signOut() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      credentials: this.credentials,
      headers: {
        "Content-Type": "application/json"
      },
    })
  }
}

export default MainApi;
  