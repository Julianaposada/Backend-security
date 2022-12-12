const{ Router } = require('express');
const router = Router ();
const Usuario = require('../Modelo/Usuario');
const { validationResult, check } = require('express-validator');
const bycript = require('bcryptjs');
const {validarJWT} = require('../middlewares/validar-jwt.js');
const {validarRolAdmin} = require ('../middlewares/validar-rol-admin');


router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('rol', 'invalid.rol').isIn(['ADMIN', 'DOCENTE']),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    validarJWT,
    validarRolAdmin

], async function(req, res){

    try{       
            console.log(req.body);
            //validacion campos requeridos 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ mensaje: errors.array() });
            }
    
            //validacion email
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({ mensaje: 'Email ya existe' });
        }

       

        let usuario = new Usuario ();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol;

        const salt = bycript.genSaltSync();
        const contrasena = bycript.hashSync(req.body.contrasena, salt);
        usuario.contrasena = contrasena;

        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
       
        
        usuario = await usuario.save();

        res.send(usuario);


    }catch(error){
        console.log(error); 
        res.status(500).json({ mensaje: 'Internal server error' });

    }
        
});

router.get('/',[validarJWT, validarRolAdmin], async function(req, res){
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);

    }catch(error) {
        console.log(error);
        return res.status(500).send({ mensaje: 'Internal error server'});
    }
 
});

router.put('/:usuarioId', async function(req, res){
    try{
        console.log('Objeto recibido', req.body, req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.send('Usuario no existe')
        }

        const existeUsuario = await Usuario
                .findOne({ email: req.body.email, _id: { $ne: usuario._id } });

        console.log('Respuesta existe usuario', existeUsuario);
        
        if (existeUsuario){
            return res.send('Email ya existe');
        }

        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado; 
        usuario.rol = req.body.rol;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
    
 
});


module.exports = router;
