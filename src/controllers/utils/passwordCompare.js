const bcrypt = require('bcryptjs');

const comparePassword = async(password_old, password_user) => {
    return await bcrypt.compare(password_old, password_user);
}

module.exports = comparePassword;