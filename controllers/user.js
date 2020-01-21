const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require('../services/jwt');

const controller = {
    test: (req, res) => {
        res.status(400).send({
            message: "Illo esto es un test"
        })
    },
    saveNewUser: (req, res) => {
        let params = req.body;
        let user = new User();

        if (params.name && params.surname && params.nick && params.email && params.password) {
            user.name = params.name;
            user.surname = params.surname;
            user.nick = params.nick;
            user.email = params.email;

            User.find({
                $or: [{
                    email: user.email.toLowerCase()
                }, {
                    nick: user.nick.toLowerCase()
                }]
            }).exec((err, users) => {
                if (err) return res.status(500).send({
                    message: "Error en la peticion de usuarios!"
                });
                if (users && users.length >= 1) {
                    res.status(400).send({
                        message: "Este usuario ya existe cambia el email y nombre de usuario"
                    });
                } else {
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err) return res.status(500).send({
                                message: "Error al guardar datos!"
                            });
                            if (userStored) {
                                res.status(200).send({
                                    user: userStored, token: jwt.createToken(userStored)
                                });
                            } else {
                                res.status(404).send({
                                    message: "No se ha registrado el usuario"
                                });
                            }
                        });
                    });
                }

            });
        } else {
            res.status(400).send({
                message: "Faltan campos por rellenar!"
            });
        }
    },

    loginUser: (req, res) => {
        let params = req.body;

        let nick = params.nick;
        let password = params.password;

        User.findOne({
            nick: nick
        }, (err, user) => {
            if (err) return res.status(500).send({
                message: "Error en la peticion!"
            });
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {                                            
                        return res.status(200).send({
                            user: user, token: jwt.createToken(user)
                        });                        
                    } else {
                        return res.status(400).send({
                            message: "Usuario o contraseña no son validos"
                        });
                    }
                })
            } else {
                return res.status(404).send({
                    message: "El usuario no existe"
                });
            }
        })
    },

    getUserById: (req, res) => {
        let userId = req.params.id;

        User.findById(userId, (err,user) =>{
            if(err) return res.status(500).send({message:'Error en la peticion'});
            if(!user) return res.status(404).send({message:'El usuario no existe'});
            return res.status(200).send({user});
        })

    },

    getAllUsers: (req, res) => {
        let identy_user_id = req.user.sub;
        User.find( (err,users) =>{
            if(err) return res.status(500).send({message:'Error en la peticion'});
            if(users)return res.status(200).send({users});
        } )

    },
    updateUser: (req, res) => {

        let update = req.body;

        delete update.password;

        if (userId != req.user.sub) {
            return res.status(500).send({
                message: "No tienes permiso para actualizar los datos de usuario"
            });
        }

        User.findByIdAndUpdate(userId, update, {
            new: true
        }, (err, userUpdated) => {
            if (err) return res.status(500).send({
                message: "Error en la peticion"
            });

            if (!userUpdated) return res.status(404).send({
                message: "No se ha podido actualizar los datos de usuario :("
            });

            return res.status(200).send({
                user: userUpdated
            });
        })
    },





};



module.exports = controller;