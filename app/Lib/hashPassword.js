// const crypto = require('crypto')

// function decryptPassword(loginPassword, password, salt) {
//     console.log("loginpassard",loginPassword);
//     console.log("passard",password);
//     console.log("salt",salt);
//     try {

//         let hash = crypto.pbkdf2Sync(password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);
//         console.log("hasj", hash);
//         if (hash === loginPassword) {
//             return true;
//         }
//         return false;
//     }
//     catch (err) {
//         console.log(err)
//         return '';
//     }
// }
// function encryptPassword(password) {
//     console.log("data", password)
//     try {
//         let salt = crypto.randomBytes(16).toString('hex');
//         console.log("passwordsalt", salt)
//         let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
//         console.log("passwordhash", salt)
//         return { salt: salt, hash: hash, password: password };
//     }
//     catch (err) {
//         return '';
//     }
// }


const crypto = require('crypto');

function encryptPassword(password){

    try{
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`);        
        return {salt : salt, hash : hash, password :password };
    }
    catch(ex){
        return '';
    }
}

function decryptPassword(password, dbPassword, salt){

  //  console.log("ssfsfsd", {"pwd": pwd, "pwdhash": pwdhash, "salt": salt} );

    try{
        
        let hash = crypto.pbkdf2Sync(password.toString(), salt, 1000, 64, `sha512`).toString(`hex`);  
        console.log("hash", hash);
        if(hash === dbPassword){
            return true;
        }
        return false;
    }
    catch(ex){   
       // console.log(ex)     
        return '';
    }
}

module.exports = {
    encryptPassword: encryptPassword,
    decryptPassword: decryptPassword
}