
//Este módulo es para ver la validación del token del usuario
const jwt = require("jsonwebtoken");
 
module.exports = (req, res, next) => {

    //Asignamos el request de cabecera
    const authHeader = req.headers.authorization;

    //Si no viene con la cabecera de authorization entonces mandamos un error
    //de autorización
    if(!authHeader)
        return res.status(401).send({ error: "No autorizado" });

    //Si viene con cabecera entonces sacamos Bearer y el token hash con split
    //esto daría como resultado 2 secciones (bearer y token hash)
    const parts = authHeader.split(" ");

    //Si la división con split es distinto a 2 entonces hay un error de token
    if(!parts.length == 2)
        res.status(401).send({ error: "Error de Token" });

    //Si la división con split da 2 entonces destructuramos y separamos
    //la respuesta de cabecera
    const [scheme, token] = parts;

    //Buscamos que exista la palabra Bearer dentro de la constante scheme
    //si no existe la palabra entonces mandamos un error de formato de token
    if(!/^Bearer$/i.test(scheme))
       return res.status(401).send({ error: "Token sin formato" });

    //Si existe la palabra Bearer entonces pasamos a verificar la validez del token   
    jwt.verify(token, process.env.SIGNATURE_TOKEN, (error, decode) => {
        if(error)
            return res.status(401).send({ error: "Token inválido" });

        req.userId = decode.id;
        return next();
    });

}