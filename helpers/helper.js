import moment from "moment";
import * as moment_timezone from 'moment-timezone';
require("moment/min/locales.min");
function ltrim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^' + chr + '+');
    return str.replace(rgxtrim, '');
}

function formatString(fmt, ...args) {
    if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
        throw new Error('invalid format string.');
    }
    return fmt.replace(/((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g, (m, str, index) => {
        if (str) {
            return str.replace(/(?:{{)|(?:}})/g, m => m[0]);
        } else {
            if (index >= args.length) {
                throw new Error('argument index is out of range in format');
            }
            return args[index];
        }
    });
}

const objectToArray = (obj) => {
    var arr = [];
    var arrkeys = [];
    for (const [key, value] of Object.entries(obj)) {
        arr.push(value);
        arrkeys.push(key);
    }
    return { arr, arrkeys };
}
const setRegistrationEndtime = (timezone, form_registration_end_date) => {
    const moment_now = moment_timezone(new Date());
    const servertime = new Date();
    const options = { timeZone: timezone };
    const EventTimezoneDateTime = moment_timezone(new Date(servertime.toLocaleString('en-US', options)));
    const difference = moment_timezone.duration(moment_now.diff(EventTimezoneDateTime));
    const final_date_time = moment_timezone(form_registration_end_date);
    const finalDateTimeWithDifference = final_date_time.clone().add(difference);
    return finalDateTimeWithDifference;
}
export {
    formatString,
    ltrim,
    objectToArray,
    setRegistrationEndtime,
};

export const getMeta = (url, type) => {
    const img = new Image();
    img.src = url;
    if (type === 'width') {
        return img.width;
    } else {
        return img.height
    }
};

export const localeProgramMoment = (language_id, date = null) => {
    let locale = 'en_US';
    let format = 'D MMMM, YYYY';
    if (language_id == 2) {
        locale = 'da_DK';
        format = 'dddd D. MMMM YYYY';
    }
    else if (language_id == 3) {
        locale = 'no_NO';
        format = 'D. MMMM YYYY';
    }
    else if (language_id == 4) {
        locale = 'de_DE';
        format = 'D. MMMM YYYY';
    }
    else if (language_id == 5) {
        locale = 'lt_LT';
        format = 'YYYY MMMM D dddd';

    }
    else if (language_id == 6) {
        locale = 'fi_FI';
        format = 'D. MMMM YYYY';

    }
    else if (language_id == 7) {
        locale = 'sv_SE';
        format = 'D MMMM YYYY';

    }
    else if (language_id == 8) {
        locale = 'nl_NL';
        format = 'D MMMM YYYY';

    }
    else if (language_id == 9) {
        locale = 'nl_BE';
        format = 'D MMMM YYYY';
    }

    
    // if (date !== null) {
    //     let localeBasedMoment = moment(date).locale(locale);
    //     return localeBasedMoment.format(format);
    // }
    // let localeBasedMoment = moment().locale(locale);
    return moment(date).locale(locale).format(format).charAt(0).toUpperCase() + moment(date).locale(locale).format(format).slice(1)
}

export const localeProgramMomentHome = (language_id, date = null) => {
    let locale = 'en_US';
    let format = 'Do MMMM';

    if (language_id == 2) {
        locale = 'da_DK';
        format = 'Do MMMM';
    }
    else if (language_id == 3) {
        locale = 'no_NO';
        format = 'Do MMMM';
    }
    else if (language_id == 4) {
        locale = 'de_DE';
        format = 'Do MMMM';
    }
    else if (language_id == 5) {
        locale = 'lt_LT';
        format = 'Do MMMM';

    }
    else if (language_id == 6) {
        locale = 'fi_FI';
        format = 'Do MMMM';

    }
    else if (language_id == 7) {
        locale = 'sv_SE';
        format = 'Do MMMM';

    }
    else if (language_id == 8) {
        locale = 'nl_NL';
        format = 'Do MMMM';

    }
    else if (language_id == 9) {
        locale = 'nl_BE';
        format = 'Do MMMM';
    }

    
    if (date !== null) {
        let localeBasedMoment = moment(date).locale(locale);
        return localeBasedMoment.format(format);
    }
    let localeBasedMoment = moment().locale(locale);
    return localeBasedMoment.format(format)
}

export const metaInfo = async (url, screen) => {

    const res = await fetch(url, {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: {
            screen: ''
        }
    });

    const data = await res.json();

    return data.event;
}
export const locales = [
    'en_US',
    'da_DK',
    'no_NO',
    'de_DE',
    'lt_LT',
    'fi_FI',
    'sv_SE',
    'nl_NL',
    'nl_BE'
];

export const localeMomentEventDates = (date, language_id) => { 
     let locale = 'en_US';
      let format = 'dddd, D. MMMM YYYY';
       if (language_id == 2) {
         locale = 'da_DK';
         format = 'dddd, D. MMMM YYYY';
       } else if (language_id == 3) {
         locale = 'no_NO';
          format = 'dddd, D. MMMM YYYY'; 
        } else if (language_id == 4) {    
            locale = 'de_DE';    format = 'dddd, D. MMMM YYYY';
        } else if (language_id == 5) {   
            locale = 'lt_LT';    format = 'dddd, D. MMMM YYYY';
        } else if (language_id == 6) {   
            locale = 'fi_FI';    format = 'dddd, D. MMMM YYYY';
        } else if (language_id == 7) { 
            locale = 'sv_SE';    format = 'dddd, D. MMMM YYYY';  
        } else if (language_id == 8) {
            locale = 'nl_NL';    format = 'dddd, D. MMMM YYYY';  
        } else if (language_id == 9) {
            locale = 'nl_BE';    format = 'dddd, D. MMMM YYYY';  
        }  
        return moment(date).locale(locale).format(format).charAt(0).toUpperCase() + moment(date).locale(locale).format(format).slice(1);
    }

export const localeMomentOpeningHours = (date, language_id) => {
    let locale = 'en_US';
    let format = 'dddd:';
    if (language_id == 2) {
        locale = 'da_DK';
        format = 'dddd:';
    }
    else if (language_id == 3) {
        locale = 'no_NO';
        format = 'dddd:';
    }
    else if (language_id == 4) {
        locale = 'de_DE';
        format = 'dddd:';
    }
    else if (language_id == 5) {
        locale = 'lt_LT';
        format = 'dddd:';

    }
    else if (language_id == 6) {
        locale = 'fi_FI';
        format = 'dddd:';

    }
    else if (language_id == 7) {
        locale = 'sv_SE';
        format = 'dddd:';

    }
    else if (language_id == 8) {
        locale = 'nl_NL';
        format = 'dddd:';

    }
    else if (language_id == 9) {
        locale = 'nl_BE';
        format = 'dddd:';
    }
    let localeBasedMoment = moment(date).locale(locale);
    return localeBasedMoment.format(format).charAt(0).toUpperCase() + localeBasedMoment.format(format).slice(1);
}

export function setWithExpiry(key, value, ttl) {
	const now = new Date()
	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}



export function GATrackEventDocumentDownloadEvent(event_cat, event_name, event_label){
    if(window !== undefined && window.gtag !== undefined){
        window.gtag('event', event_cat, {
            event_category: event_cat,
            event_action: event_name,
            event_label: event_label,
          })
    }
}

export const formatInputCheck = (e) => {
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
    }
    else if (e.keyCode !== undefined) {
      // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
      checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
    }
    return checkIfNum && e.preventDefault();
  }