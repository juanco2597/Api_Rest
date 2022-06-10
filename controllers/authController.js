const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const Usuario = require("../models/usuario");

const registerUsuario = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(501).json({
            ok:false,
            errors: errors.mapped()
        })
    }

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

        const payload = {
            id: nuevoUsuario.id,
        }

        jwt.sign(payload,process.env.SECRETA, {expiresIn: 3600}, (error, token) => {

            res.json({
            ok: true,
            id: nuevoUsuario.id,
            email, 
            username, 
            msg:"Usuario creado",
            token
            });

        })

        
        } catch (error) {
            res.json({
            ok:false,
            msg:"Error al registrar"
            });
        }
};


const loginUsuario = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(501).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    const { email, password } = req.body;

    try {
        
        let user = await Usuario.findOne({ email });

            if( !user ){
                return res.status(401).json({
                    ok:false,
                    msg:"Correo o contraseña invalidos"
                });
            }

        const passwordValido = bcryptjs.compareSync(password, user.password)

        if( !passwordValido ){
            return res.status(401).json({
                ok:false,
                msg:"Correo o contraseña invalidos"
            });
        }

        const payload = {
            id: user.id,
        }

        jwt.sign(payload, process.env.SECRETA, {expiresIn: 3600}, (error, token) => {

            res.json({
            ok: true,
            id: user.id,
            email, 
            username: user.username, 
            msg:"Inicio sesion",
            token
        
            });

        })

    } catch (error) {
        res.json({
            ok:false,
            msg:"Error al iniciar"
            });
    }
}


module.exports = {
    loginUsuario,
    registerUsuario
}