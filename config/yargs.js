const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const filtro = {
    alias: 'f',
    desc: 'Filtra las tareas por hacer referente al estado'
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion //descripcion: descripcion
    })
    .command('actualizar', 'Actualiza una tarea por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea por hacer', {
        descripcion
    })
    .command('listar', 'Hace una lista de las tareas por hacer', {
        filtro
    })
    .help()
    .argv;

module.exports = {
    argv
};