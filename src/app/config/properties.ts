<<<<<<< HEAD
export const URL = 'http://10.1.87.111:8081/';
=======
export const URL = 'http://10.1.87.224:8081/';
// export const URL = 'http://172.17.3.49:8080/spin-s/';
>>>>>>> 9eef3a778a44e4ed0531bb796c356fe23a44868a
export const Method = {
    GET: 'GET',
    POST: 'POST'
}
export const Severity = {
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
}
export const Status = {
    SUCCESS: 'success',
    ERROR: 'error'
}
export let WorkingTime = [600, 630, 700, 730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830]

export const Default = {
    USR: btoa('spin:username'),
    PWD: btoa('spin:password'),
    RMB: btoa('spin:rememberme'),
    YES: btoa('spin:yes'),
    NO: btoa('spin:no'),
    ACTOKN: btoa('spin:access_token'),
    TOKNTY: btoa('spin:token_type'),
    RFTOKN: btoa('spin:refresh_token')
}

export const Format = {
    DATE_DB: 'YYYYMMDD',
    DATE_PIK: 'dd/mm/yy',
    DATE_PIKC: 'DD MMMM',
    DATE_PIKR: 'MMDD',
    DDDD: 'dddd',
    DD: 'DD',
    MMMM: 'MMMM',
    MMM: 'MMM',
    MM: 'MM',
    YYYY: 'YYYY',
}
export const Mode = {
    V: 'VIEW',
    E: 'EDIT',
    I: 'INSERT'
}
export var Locale = 'th'
export const Locales = {
    TH: 'th',
    EN: 'en'
}
