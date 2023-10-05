const bcrypt = require('bcrypt');

function HashText(text) {
    bcrypt.genSalt(
        10,
        function(err, salt) {
            bcrypt.hash(
                text,
                salt,
                function(err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    return hash;
                }
            );
        }
    );
}

function TextHashCompare(text, hash, callback) {
    bcrypt.compare(
        text,
        hash,
        function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        }
    );
}

module.exports = { HashText, TextHashCompare };