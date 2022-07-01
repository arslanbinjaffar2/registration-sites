import moment from "moment";

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

export {
    formatString,
    ltrim,
    objectToArray,
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
    let locale = 'en';
    let format = 'D MMMM, YYYY';
    if (language_id == 2) {
        locale = 'da';
        format = 'dddd D. MMMM YYYY';
    }
    else if (language_id == 3) {
        locale = 'no';
        format = 'D. MMMM YYYY';
    }
    else if (language_id == 4) {
        locale = 'de';
        format = 'D. MMMM YYYY';
    }
    else if (language_id == 5) {
        locale = 'lt';
        format = 'YYYY MMMM D dddd';

    }
    else if (language_id == 6) {
        locale = 'fi';
        format = 'D. MMMM YYYY';

    }
    else if (language_id == 7) {
        locale = 'se';
        format = 'D MMMM YYYY';

    }
    else if (language_id == 8) {
        locale = 'nl';
        format = 'D MMMM YYYY';

    }
    else if (language_id == 9) {
        locale = 'be';
        format = 'D MMMM YYYY';
    }
    if (date !== null) {
        return moment(date).locale(locale).format(format);
    }

    return moment().locale(locale).format(format)
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