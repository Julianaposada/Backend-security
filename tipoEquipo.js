const{ Router } = require('express');
const TipoEquipo = require('../Modelo/TipoEquipo');
const router = Router ();
const {validarJWT} = require ('../middlewares/validar-jwt');
const {validarRolAdmin} = require ('../middlewares/validar-rol-admin');

router.get('/', [validarJWT, validarRolAdmin],async function(req, res){
    try {
        const tipos = await TipoEquipo.find();
        res.send(tipos);

    }catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
    
});

router.post('/',[validarJWT, validarRolAdmin], async function(req, res){
    try{
        let tipoEquipo = new TipoEquipo();
    
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }

});

router.put('/:tipoEquipoId',[validarJWT, validarRolAdmin], async function(req, res){
    try{
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
    
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router; 