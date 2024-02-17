import { useState, useCallback } from 'react';

export function useFormAndValidation(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validate = (name, value) => {
        let errorMessage = '';

        if (!value) {
            errorMessage = 'Это поле не может быть пустым';
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            errorMessage = 'Некорректный формат электронной почты';
        } else if (name === 'password' && value.length < 6) {
            errorMessage = 'Пароль должен быть не менее 6 символов';
        } else if (name === 'movie' && value.length < 1) {
            errorMessage = 'Введите более 1 символа для поиска ролика';
        } else if (name === 'name' && !/^[A-Za-zА-Яа-я\s-]+$/.test(value)) {
            errorMessage = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
        }

        return errorMessage;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const form = e.target.closest('form');
    
        const errorMessage = validate(name, value);
    
        setValues(prevValues => ({ ...prevValues, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
        setIsValid(form.checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}