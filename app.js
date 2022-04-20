//aplicacion de consola interactiva-tareas por hacer.

require('colors');


const { guardarDB, leerDB } = require('./db/saveFiles');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoParaCompletar } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu} = require('./helpers/mensajes');

//console.clear();
const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();

    if (tareaDB) {

        tareas.cargarTareafromArray(tareaDB);

    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                console.log(tareas.listadoCompletoTareas());
                break;
            case '3':
                console.log(tareas.listaTareasCompletadas(true));
                break;
            case '4':
                console.log(tareas.listaTareasCompletadas(false));
                break;
            case '5':
                const ids = await listadoParaCompletar(tareas.listadoArr);
                tareas.toggleTareasCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const deleteOrNot = await confirmar('¿Esta seguro de que quiere borrar la tarea?');
                    if (deleteOrNot) {
                        tareas.borrarTarea(id);
                        console.log('\n Tarea borrada correctamente');
                    }
                }
                break;


        }

        guardarDB(tareas.listadoArr);




        await pausa();

    } while (opt !== '0');
}


main();

