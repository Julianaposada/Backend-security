const { Router} = require('express');
const EstadoEquipo = require ('../Modelo/EstadoEquipo');
const router = Router();
const {validarJWT} = require ('../middlewares/validar-jwt');
const {validarRolAdmin} = require ('../middlewares/validar-rol-admin');

router.get('/', [validarJWT, validarRolAdmin],async function(req, res){
    try{
        const tipos = await EstadoEquipo.find();
        res.send(tipos)
      
        
    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/',[validarJWT, validarRolAdmin], async function(req, res){
    try{
        let estadoEquipo = new EstadoEquipo();
    
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
   

});

router.put('/:estadoEquipoId',[validarJWT, validarRolAdmin], async function(req, res){
    try{
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo) {
            return res.send('No existe estado');
        }
    
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    }catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
   
});

module.exports = router;