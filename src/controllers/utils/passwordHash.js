//Creamos una función para hashear el password y retornarlo listo
const bcrypt = require('bcryptjs');

//Recibimos la contraseña
const passwordHash = async(password) => {
    //Generamos los saltos de encryptación, 10 es seguro
    const salt = await bcrypt.genSalt(10);
    //Hasheamos la contraseña
    const passwordHash = await bcrypt.hash(password, salt);
    //Retornamos la contraseña hasheada
    return passwordHash;
}

module.exports = passwordHash;