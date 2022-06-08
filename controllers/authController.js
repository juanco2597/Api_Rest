const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const registerUsuario = async (req, res) => {
    const { email, password, username } = req.body;
    try {

        let usuario = await Usuario.findOne({ email });

            if( usuario ){
                return res.status(501).json({
                    ok:false,
                    msg:"Correo ya registrado"
                });
            }

    const nuevoUsuario = new Usuario({ email, password, username });

    const  salt = bcryptjs.genSaltSync(12);

    nuevoUsuario.password = bcryptjs.hashSync(password, salt)

        await nuevoUsuario.save();

        res.json({
            ok: true,
            email, 
            username, 
            msg:"Usuario creado"
            });
        } catch (error) {
            res.json({
            ok:false,
            msg:"Error al registrar"
            });
        }
};




const loginUsuario = (req, res)=>{}


module.exports = {
    loginUsuario,
    registerUsuario
}