const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                username: DataTypes.STRING,
                password: DataTypes.STRING,
                bio: DataTypes.TEXT,
                phone: DataTypes.STRING,
                key: DataTypes.STRING,
                avatar_url: DataTypes.STRING,
            },
            {
                sequelize
            }
        );
    }

    static associate(models){
        this.hasMany(models.Photo, { 
            foreignKey: "user_id", as: "photoUploads"
         })
    }
}

module.exports = User;

