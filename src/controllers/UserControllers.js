const User = require('../models/User');

module.exports = {

    async store(req, res) {

        const { name, email, username, password } = req.body;

        const user = await User.create({
            name,
            email,
            username,
            password
        })
        res.json(user);
    }









}