
import moment from "moment";

const isSafariRegexp = /^((?!chrome|android).)*safari/i;
const getNavigatorLanguage = () => {
    const navigatorLng = navigator.language.split('-')[0];
    return ["es", "en"].includes(navigatorLng)? navigatorLng : "en";
}


export const isSafari = isSafariRegexp.test(navigator.userAgent);

export const formatDate = dateStr => {
    const date = new Date(dateStr);
    const opts = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const format = new Intl.DateTimeFormat(getNavigatorLanguage(), opts);
    const [{ value: value1 },,{ value: value2 },,{ value: value3 },,{ value: hour },, { value: minutes }] = format.formatToParts(date);
    return `${value1}/${value2}/${value3} - ${hour}:${minutes}`;
}


