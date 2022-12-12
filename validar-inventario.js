const validarInventario = (req) => {
    const validaciones = [];
    
    if (!req.body.serial) {
        validaciones.push ('serial es requerido');
    }
    if (!req.body.modelo) {
        validaciones.push ('modelo es requerido');
    }
    if (!req.body.descripcion) {
        validaciones.push ('descripcion es requerido');
    }
    if (!req.body.foto) {
        validaciones.push ('foto es requerido');
    }
    if (!req.body.fechacompra) {
        validaciones.push ('fechacompra es requerido');
    }
    if (!req.body.precio) {
        validaciones.push ('precio es requerido');
    }
    if (!req.body.usuario) {
        validaciones.push ('serial es requerido');
    }
    if (!req.body.marca) {
        validaciones.push ('marca es requerido');
    }
    if (!req.body.TipoEquipo) {
        validaciones.push ('Tipo equipo es requerido');
    }
    if (!req.body.EstadoEquipo) {
        validaciones.push ('Estado de equipo es requerido');
    }
    return  validaciones;



}
module.exports = {validarInventario,}
