'use strict';
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user-model');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios'
    });
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';
    if (params.password) {
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //guardar usuario
                user.save((err, userStored) => {
                    if (!err) {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario}'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    } else {
                        res.status(500).send({
                            message: 'Error al guardar el usuario}'
                        });
                    }
                });
            } else {
                //
                res.status(200).send({
                    message: 'Introduce todos los campos}'
                });
            }
        });
    } else {
        res.status(500).send({
            message: 'Introduce la contraseña}'
        });
    }
}
module.exports = {
    pruebas,
    saveUser
};