const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
    const token = jwt.sign(payload, '12345', {expiresIn:'1h'});
    return token;
}
module.exports = {
    generarJWT
}