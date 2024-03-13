class MoviesApi {
    constructor() {
        this.baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
        this.localUrl = 'https://api.movie.nomoredomainsmonster.ru';
       //  this.localUrl = 'http://localhost:3001';

        this.credentials = 'include';
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkResponse);
    }

    async getSavedMovies() {
        return fetch(`${this.localUrl}/movies`, {
            headers: this.headers,
            credentials: this.credentials
        })
            .then(this._checkResponse);
    }

    async getInitialMovies() {
        return fetch(this.baseUrl, {
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    async createMovie(movieData) {
        return fetch(this.localUrl + '/movies', {
            method: 'POST',
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify(movieData)
        })
            .then(this._checkResponse);
    }

    async deleteMovie(movieId) {
        return fetch(`${this.localUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: this.credentials,
            headers: this.headers
        })
            .then(this._checkResponse);
    }
}

export default MoviesApi;
