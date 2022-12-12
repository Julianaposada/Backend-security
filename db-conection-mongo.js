const mongoose = require('mongoose');

const getConnection = async () => {
     try {
         const url = mongosh "mongodb+srv://cluster0.bzyunxu.mongodb.net/user_bd" --apiVersion 1 --username user_bd

         await mongoose.connect(url);

        console.log('conexion exitosa');
    }  catch (error){
          console.log(error);
    }
}
module.exports = {
    getConnection,
}
