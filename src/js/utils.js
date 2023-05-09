export const slugify = (text) => {
    return text
        .toString()
        .toLocaleLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-UK', {
        timeZone: "UTC"
    })
}