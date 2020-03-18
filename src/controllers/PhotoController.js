
const Photo = require('../models/Photo');

module.exports = {

    async show (req, res) {
        const { id } = req.params;
         
    },



    async store (req, res) {
        const { filename: key } = req.file;
        const { body } = req.body;

        const url = `${process.env.APP_URL}/files/${key}`;

        const photoCreated = await Photo.create({
            user_id: req.userId,
            body,
            key,
            photo_url: url
        });

        const photo = await Photo.findByPk(photoCreated.id, {
            attributes: {
                exclude: ["updatedAt"]
            },
            include: [
                {
                    association: "uploadedBy",
                    attributes: ["username", "avatar_url"]
                },
                {
                    association: "getComments",
                    attributes: {
                        exclude: ["photo_id", "updatedAt"]
                    },
                    include: {
                        association: "postedBy",
                        attributes: ["username"]
                    },
                    limit: 3
                },
                {
                    association: "getLikes",
                    attributes: ["user_id"]
                }
            ],
            order: [["createdAt", "desc"]]
        });

        let isAutor = false;
        if (photo.user_id == req.userId) isAutor = true;

        let isLiked = false;
        photo.getLikes.map(like => {
            if(like.user_id == req.userId) isLiked = true;
        });

        return res.json({ isAutor, isLiked, photo });

    }

}