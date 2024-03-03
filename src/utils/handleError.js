export function handleError(error, errorMapping) {
    const status = error.status;
    return errorMapping[status] || 'Произошла неизвестная ошибка.';
} 
