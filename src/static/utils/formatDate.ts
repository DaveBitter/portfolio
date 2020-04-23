export default (date: string, format: any, locale: string = 'en') => {
    if (!date) { return; }

    date = date.toString();
    return (date.includes(':') || date.includes('-') || date.includes('/')) ? new Intl.DateTimeFormat(locale, format).format(new Date(date)) : date;
};
