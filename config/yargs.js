/* const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10

    }

}
 */

const descripcion = {
    demand: true,
    alias: 'd',
    //descripción adicional el parámetro
    desc: 'descripción de la tarea x hacer'
};

const completado = {
    demand: false,
    alias: 'c',
    desc: 'Marca como completao o pdte la tarea'
};

const argv = require('yargs')
    //primer parámetro -> objeto. 
    //segundo parámetro -> ayuda.
    //tercer parámetro -> objeto con parametros del comando

.command('crear', 'Crea un elemento por hacer', {
        descripcion

    })
    .command('listar', 'listar las tareas')
    .command('borrar', "borrar un item", {
        descripcion
    })

.command('actualizar', 'actualizar el estado completado de una tarea', {
        descripcion,
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
}