import crypto from 'crypto';

let generateRandomStringKey = ()=>{
    return crypto.randomBytes(16).toString('hex')
}



export let generateShortCode = ()=>{
    return crypto.randomBytes(6).toString('base64url');
}

