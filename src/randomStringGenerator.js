import crypto from 'crypto';

let generateRandomStringKey = ()=>{
    return crypto.randomBytes(16).toString('hex')
}

console.log(generateRandomStringKey())