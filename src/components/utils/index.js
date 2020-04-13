
import moment from "moment";

const isSafariRegexp = /^((?!chrome|android).)*safari/i;

export const isSafari = isSafariRegexp.test(navigator.userAgent);

export default {
    formatDate(date) {
        return moment(date).format('D MMM, kk:mm');
    }
}