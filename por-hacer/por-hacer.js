const fs = require('fs');


let listadoPorHacer = [];

let guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}


const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const getListado = () => {
    cargarDB();
    //let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado !== completado);
    return listadoPorHacer;

};
const getListadoFiltro = (filtro) => {
    cargarDB();
    let nuevaLista = [];

    for (let tarea of listadoPorHacer) {
        if (tarea.completado === filtro) {
            nuevaLista.push(tarea);
        }
    }

    return nuevaLista;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        let borrado = listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

    //Otra forma de hacerlo con arra.filter()>> esta funcion devuelve un nuevo arreglo con los elementos que no sean el
    // que se excluira
    // cargarDB();
    // let nuevoListado = listadoPorHacer.filter(tarea => {
    //     return tarea.descripcion !== descripcion;
    // })
    // if (listadoPorHacer.length === nuevoListado.length) {
    //     return false;
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    //     return true;
    // }

};

module.exports = {
    crear,
    getListado,
    getListadoFiltro,
    actualizar,
    borrar
}