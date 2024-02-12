
export const MOVIE_API_URL = 'https://api.nomoreparties.co';
export const BEATFILM_MOVIE_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const EMAIL_PATTERN = '[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+';
export const TIMEOUT_DELAY = 500;


export const loginErrors = {
    409: 'Вы ввели неправильный логин или пароль.',
    400: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
    401: 'При авторизации произошла ошибка. Переданный токен некорректен',
};

export const registerErrors = {
    409: 'Пользователь с таким email уже существует.',
    500: 'При регистрации пользователя произошла ошибка',
};

export const profileErrors = {
    409: 'Пользователь с таким email уже существует.',
    500: 'При обновлении профиля произошла ошибка.',
};

export const serverErrors = {
    500: '500 На сервере произошла ошибка.',
    404: '404 Страница по указанному маршруту не найдена.',
};

export const signOutErrors = {
    500: 'Произошла серверная ошибка при попытке выхода из системы.',
};

export const tokenCheckErrors = {
    401: 'Неверный токен. Пожалуйста, войдите заново.',
    500: 'Произошла серверная ошибка при проверке токена.',
};

export const likedMoviesErrors = {
    500: 'Серверная ошибка. Не удалось загрузить лайкнутые фильмы.',
};

export const movieSearchErrors = {
    500: 'Серверная ошибка. Не удалось выполнить поиск фильмов.',
};

export const movieLikeErrors = {
    500: 'Серверная ошибка. Не удалось поставить лайк фильму.',
    400: 'Серверная ошибка. Переданы некорректные данные.'
};

export const movieDeleteErrors = {
    500: 'Серверная ошибка. Не удалось удалить фильм.',
};

export const VISIBLE_MOVIES = {
    LARGE: 16,
    MEDIUM: 12,
    SMALL: 8,
    EXTRA_SMALL: 5,
};

export const WINDOW_WIDTH_THRESHOLD = {
    LARGE: 1279,
    MEDIUM: 989,
    SMALL: 767,
    EXTRA_SMALL: 850,
};