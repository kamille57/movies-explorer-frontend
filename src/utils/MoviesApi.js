class MoviesApi {
    constructor() {
        // this.baseUrl = 'https://api.kamille57.nomoredomainsrocks.ru'; 
        this.baseUrl = 'http://localhost:3001';
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

    
}

export default MoviesApi;