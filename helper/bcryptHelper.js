const bcrypt = require('bcrypt');
const saltRounds = 2;

function salt(password) {
    return new Promise((reject, resolve) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err)
                reject(err)
            else
                resolve(hash)
        });
    })
}

function checkPassword(password, hash) {
    new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err)
                reject(err)
            else
                resolve(result)
        })
    })
}

const bcryptFunction = {
    salt,
    checkPassword
}

module.exports = bcryptFunction