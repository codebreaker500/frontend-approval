export const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
    return;
};

export const formatDateTime = (value) => {
    if (value) {
        const date = new Date(value);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }
    return;
};