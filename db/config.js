const mongoose = require('mongoose');

const conexionDB = async () => {
    
    try {
        await mongoose.connect(process.env.DB_CONECTION); 

        console.log("Conectado a la DB");
    }
    catch (error) {
        console.log("Error al conectar");
    }
    
    
}

module.exports = conexionDB;