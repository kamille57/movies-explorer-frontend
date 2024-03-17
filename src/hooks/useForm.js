import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = '';

    if (!value) {
      error = 'Это поле не может быть пустым';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Некорректный формат электронной почты';
    } else if (name === 'email' && value.length < 6) {
      error = 'Email должен содержать не менее 6 символов';
    } else if (name === 'password' && value.length < 6) {
      error = 'Пароль должен быть не менее 6 символов';
    } else if (name === 'movie' && value.length < 1) {
      error = 'Введите более 1 символа для поиска ролика';
    } else if (name === 'name' && !/^[A-Za-zА-Яа-я\s-]+$/.test(value)) {
      error = 'Латиница или кириллица допустимы для ввода';
    } else if (name === 'name' && value.length < 2) {
      error = 'Имя должно содержать не менее 2 символов';
    }
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    if (validate) {
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validateForm = () => {
    if (!validate) return true;

    const newErrors = {};

    let isValid = true;

    for (const key in values) {
      const error = validate(key, values[key]);

      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    }

    setErrors(newErrors);

    return isValid;
  };

  const getInputProps = (name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
  });

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validateForm,
    getInputProps,
  };
}

export default useForm;