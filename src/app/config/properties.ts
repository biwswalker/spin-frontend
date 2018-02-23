export const URL = 'http://10.1.87.224:8081/'
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
    NO: btoa('spin:no')
}

export const DateOptions = {
    DAY: { su: 'อา', mo: 'จ', tu: 'อ', we: 'พ', th: 'พฤ', fr: 'ศ', sa: 'ส' },
    MONTH: { 1: 'มกราคม', 2: 'กุมภาพันธ์', 3: 'มีนาคม', 4: 'เมษายน', 5: 'พฤษภาคม', 6: 'มิถุนายน', 7: 'กรกฏาคม', 8: 'สิงหาคม', 9: 'กันยายน', 10: 'ตุลาคม', 11: 'พฤศจิกายน', 12: 'ธันวาคม' },
}

export const Format = {
    DATE_DB: 'YYYYMMDD',
    DATE_PKR: 'dd mmm yyyy',
    DDDD: 'dddd',
    DD: 'DD',
    MMM: 'MMM',
}