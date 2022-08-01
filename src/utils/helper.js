export const convertToString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const result = year + '-' + month + '-' + day;
    return result;
};
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
