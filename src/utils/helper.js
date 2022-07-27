export const convertToString = (date) => {
    return date.getYear() + '-' + date.getMonth() + '-' + date.getDate();
};
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
