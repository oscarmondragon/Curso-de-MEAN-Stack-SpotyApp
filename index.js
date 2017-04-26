'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080 ;
mongoose.connect('mongodb://localhost:27017/app_musica', (err,res)=> {
  if(err){
    throw err;
  } else{
    console.log("Se ha establecido la conexion con la base de datos exitosamente");
    app.listen(port,function(){
      console.log("Servidor del api rest de musica escuchando en http://localhost:"+port);

    });
  }
});
