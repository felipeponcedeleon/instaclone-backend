const {Model, DataTypes} = require('sequelize');

class Photo extends Model {
    static init(sequelize) {
        super.init(
            {
                body: DataTypes.TEXT,
                key: DataTypes.STRING,
                photo_url: DataTypes.STRING,
            },
            {
                sequelize
            }
        );
    }

    static associations(models){
        this.belongsTo(models.User, {
            foreignKey: "user_id", as: "uploadedBy"
        })
    }
}

module.exports = Photo;
