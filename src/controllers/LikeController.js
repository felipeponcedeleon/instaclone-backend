const { Op } = require('sequelize');

const Like = require('../models/Like');
const Photo = require('../models/Photo');


module.exports = {

    async store(req, res) {
        //renombramos la variable photo (que viene por url) como photoId
        const { photo: photoId } = req.params;
        const { userId } = req;
        
        const photo = await Photo.findByPk(photoId);

        if(!photo) return res.status(400).json({
            message: "Ha ocurrido un error, probablemente la foto fue removida"
        });

        let like = await Like.findOne({
            where: { [Op.and]: [{photo_id: photo.id}, {user_id: userId}]}
        });

        if (!like) {
            let newLike = await Like.create({
                user_id: userId,
                photo_id: photo.id
            });
            return res.json(newLike);
        }else {
            await like.destroy();
            return res.json();
        }

    }

}