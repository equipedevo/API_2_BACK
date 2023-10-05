const bcrypt = require('bcryptjs');

function HashText(text, callback) {
    bcrypt.genSalt(
        10,
        function(err, salt) {
            bcrypt.hash(
                text,
                salt,
                callback
            );
        }
    );
}

function TextHashCompare(text, hash, callback) {
    bcrypt.compare(
        text,
        hash,
        callback
    );
}

module.exports = { HashText, TextHashCompare };