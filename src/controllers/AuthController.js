const {validationResult} = require('express-validator');

const User = require('../models/User');

const passwordCompare = require('./utils/passwordCompare');

const generateToken = require('./utils/generateToken');

module.exports = {
    async login (req, res) {
        const { username, password } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({
            where: {username}
        });

        if(!user)
            return res.status(400).json({
                message: "Verifica tus credenciales"
            });

        if(!(await passwordCompare(password, user.password)))
            return res.status(400).json({
                message: "Verifica tus credenciales"
            });

        const payload = { id: user.id, username: user.username };

        const token = generateToken(payload);

        return res.json({token});
    }
}