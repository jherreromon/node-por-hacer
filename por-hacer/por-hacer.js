//para poder guardar en un lugar permanente

const fs = require('fs');


let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)
        //Parametros-> fichero donde se guarda, datos que se guardan, error si no se guarda

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar', err)
    });
}

//cargamos los datos desde el fichero data.json
const cargarDB = () => {
    // en caso de q el fichero este vacio, capturarmos el error y accedemos al array vacio
    try {
        listadoPorHacer = require('../db/data.json');
        //console.log(listadoPorHacer);
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    //se carga lo que hay guardado en el fichero de datos
    cargarDB();

    //tarea q hay q hacer
    let porHacer = {
            //antes de ECMA 6 era:
            //descripcion=:descripcion 

            descripcion,
            completado: false
        }
        //una vez tenemos la tarea, la metemos en el array
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //findindex es una función que recibe un callback
    //miramos si la tarea conincide con la que buscamos.
    // y el callback, nos devuelve -1 si no la encuentra y un valor igual 
    //o mayor que cero si la encuentra


    let index = listadoPorHacer.findIndex(tarea => {

        return tarea.descripcion === descripcion
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        //devolvemos q la tarea se realizó correctamente
        return true;
    } else {

        return false

    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    });
    if (index >= 0) {
        listadoPorHacer.splice(index);
        guardarDB();
        return true;
    } else {
        return false;
    }

    //alternativa del profesor
    /* cargarDB();
        //esta función filtar todo menos lo q buscamos.Lo elimina x tanto
    
        let nuevoListado = listadoPorHacer.filter(tarea=>{
         return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length = nuevoListado.length){
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        }
    }
    
    */





}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}