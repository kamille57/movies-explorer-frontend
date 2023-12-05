import { useState } from 'react';

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

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