const mongoose = require("mongoose");

const conect = async () => {
    
    try {
        await mongoose.connect(
            'mongodb+srv://juan:pantera@cluster0.qb9imkx.mongodb.net/crud?retryWrites=true&w=majority'); 

        console.log("Conectado a la DB");
    }
    catch (error) {
        console.log("Error al conectar");
    }
    
    
}

module.exports = conect;