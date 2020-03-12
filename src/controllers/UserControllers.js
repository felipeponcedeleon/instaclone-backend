
module.exports = {

    async store(req, res) {

        const { name, email, username, password } = req.body;

        res.json({
            mensaje: 'Desde Store'
        });
    }









}