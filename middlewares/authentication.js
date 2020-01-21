
const jwt = require('jwt-simple');
const moment = require('moment');
const secretPass = 'bertin_osborne_maricon';

exports.ensureAuth = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'Se necesita un token de autentificación correcto en el header!'})
    }
    var token = req.headers.authorization.replace(/['""]+/g,'')
    
    try{
        var payload = jwt.decode(token,secretPass);

        if(payload.exp <= moment().unix()){
            res.status(401).send({
                message: 'Sesion expirada!'    
            });
        }
    }catch(ex){
        res.status(404).send({
            message: 'El Token de autentificación no es valido'
        });
    }

    req.user = payload;

    next();
   
}