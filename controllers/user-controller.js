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

function loginUser(req,res){
  var params = req.body;
  var email = params.email;
  var password = params.password;
  User.findOne({email: email.toLowerCase()}, (err,user)=>{
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    } else {
        
      if(!user){
        res.status(404).send({message: 'El usuario no existe'});
      } else{

        // comprobar contraseña
        bcrypt.compare(params.password, user.password, (err,check)=>{
          if(check){
            //devolver los datos del usuario logueado
            if(params.gethash){
              //devolver un token de jwt

            } else {
            res.status(200).send({user: user});
            }
          } else{
            res.status(404).send({message: ' El usuario no ha podido loguearse'});
          }
        });
      }

    }
  });


}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};