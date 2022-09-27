const __randomIds = {}
// const global = typeof window !== 'undefined' ? typeof window.global !== 'undefined' ? window.global : window : typeof globalThis !== 'undefined' ? typeof globalThis.global !== 'undefined' ? globalThis.global : global : typeof self !== 'undefined' ? self : {};

const firstId = createRandomId();
const otherIds  = ['a','b','c'].reduce((acc,key)=>{
    acc[key]=createRandomId()
    return acc;
},{})
console.log(JSON.stringify({
    created: {
        firstId,
        ...otherIds
    },
    __randomIds
},null,4))


function camelCase(str = null) {
    let arr = caseSplit(`${str}`);
    return arr.map((s,si)=>{
        if(!isString(s)) return null;
        let first = `${s}`.charAt(0).toUpperCase();
        let parts = [first,`${s}`.slice(1).toLowerCase()];
        if(si === 0){
             parts[0] = `${first}`.toLowerCase();
        }
        return parts.join('');
    }).filter(s=>!!s && isString(s)).join('');
}
function snakeCase(str=null){
    if(!isString(str)) return '';
    let arr = caseSplit(str);
    return arr.map((s,si)=>{
        if(!isString(s)) return null;
        return `${s}`.toLowerCase();
    }).filter(s=>!!s && isString(s)).join('_');
}
function idCase(str = null) {
    if (!isString(str)) return '';
    return camelCase(str);
}

function caseSplit(str = null) {
    if (typeof str !== 'string') {
        return null
    }

    if (!(isString(str))) {
        return null
    }
    const input = `${str}`;
    // let cleaned = replaceDoubleSpaces(`${allowUnderscores ? input.replace(/[^a-zA-Z0-9_\s]/g, '') : input.replace(/[^a-zA-Z0-9\s]/g, ' ')}`)
    let cleaned = replaceDoubleSpaces(input.replace(/[^a-zA-Z0-9\s]/g, ' '))
    let cleanedArr = cleaned.split(' ');
    return cleanedArr.map((s,si)=>{
        if(!isString(`${s}`)) return null;
        return s;
    }).filter((s,si)=>{
        return isString(s);
    });
}

function replaceSpaces(str = null, replaceWith = '') {
    if (!isString(`${str}`)) return ''
    if(!isString(replaceWith,1,false)) {
        replaceWith = '';
    }
    return `${str}`.replace(/\s/g, replaceWith);
}
function replaceDoubleSpaces(str = null, replaceWith = ' ') {
    if(!isString(str)) return '';
    if(!isString(replaceWith,1,false)) {
        replaceWith = ' ';
    }
    return `${str}`.replace(/[\s]{2,}/g, replaceWith);
}

function isString(str = null,minLength= 1, checkTrimmed=true) {

    if (typeof str !== 'string') {
        return false;
    }
    if(typeof minLength === 'number' && !isNaN(minLength)){
        if(!!checkTrimmed){
            let trimmed = `${str}`.replace(/\s/g, '');
            return trimmed.length && trimmed.length >= minLength;
        } else {
            return str.length && str.length >= minLength;
        }


    } else {
        return true
    }
}

function randomString(length = 10, options = {
    numbers: true,
    az: true,
    AZ: true,
    special: true,
    custom: ''

}) {
    const o = {
        numbers: true,
        az: true,
        AZ: true,
        special: true,
        custom: '',
        ...options
    }
    const chars = [
        o.numbers ? '0123456789' : '',
        o.az ? 'abcdefghijklmnopqrstuvwxyz' : '',
        o.AZ ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
        o.special ? '!@#$%^&*()_+-=[]{}|;:,./<>?' : '',
        o.custom ? o.custom : ''
    ].join('')
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function createRandomId(){
    let parts = [4,8,4,8].map((len,i)=>{
        const randomStringOptions = {
            numbers: i === 0 ? false : true, // first part can't start with a number
            az: true,
            AZ: true,
            special: false,
            custom: i === 0 ? '': '_' // first part can't have underscores
        }
        return randomString(len,randomStringOptions);
    });
    const id = camelCase(parts.join(' ')+` ${new Date().getTime()}`);
    if(typeof __randomIds[id] === 'undefined'){
        __randomIds[id] = true;
        return id;
    } else {
        return randomId()
    }
}

module.exports = {
    randomId:createRandomId,
    createRandomId,
    randomString,
    createRandomString: randomString,
    isString,
    replaceSpaces,
    replaceDoubleSpaces,
    caseSplit,
    camelCase,
    snakeCase,
}