'use strict';
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user-model');
var jwt = require('../services/jwt');

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

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                // comprobar contraseña
                bcrypt.compare(params.password, user.password, (err, check) => {
                    if (check) {
                        //devolver los datos del usuario logueado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken({
                                    user
                                })
                            })
                        } else {
                            res.status(200).send({
                                user: user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: ' El usuario no ha podido loguearse'
                        });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) {
                res.status(500).send({
                    message: ' Error al actualizar el usuario'
                });
            } else {
                if (!userUpdated) {
                    res.status(404).send({
                        message: ' No se ha podido actualizar el usuario'
                    });
                } else {
                    res.status(200).send({
                        user: userUpdated
                    });
                }
            }
        });
    }

    function uploadImage(req,res){
        var userId = req.params.id;
        var file_name = 'Archivo no subido';
        if(req.files){
            var file_path = req.files.image.path;
            //variables para sacar el nombre del archivo 
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            //variables para obtener la extencion del archivo
            var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];
            // console.log(file_path);
            console.log(ext_split);
           if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, {image: file_name},(err,userUpdated) => {
              if (err) {
                res.status(500).send({
                    message: ' Error al actualizar el usuario'
                });
            } else {
                if (!userUpdated) {
                    res.status(404).send({
                        message: ' No se ha podido actualizar el usuario'
                    });
                } else {
                    res.status(200).send({
                        user: userUpdated
                    });
                }
            }
            });

           } else {
             res.status(200).send({message:  'Extension del archivo no valida'});

           }


        } else {
            res.status(200).send({message:  'No has subido ninguna imagen'});
        }

    }
function getImageFile(req,res){
    var image_file  = req.params.imageFile;
    var path_file = './uploads/users/'+ image_file;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        } else {
          res.status(200).send({message:  'No existe la imagen'});
        }

    });

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};