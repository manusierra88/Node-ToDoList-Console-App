const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();
        console.log('=======================================');
        console.log('           Menú de opciones           ');
        console.log('=======================================\n');

        console.log(`${'1'.white} Crear nueva tarea`);
        console.log(`${'2'.white} Lista de tareas`);
        console.log(`${'3'.white} Lista de tareas completadas`);
        console.log(`${'4'.white} Lista de tareas por completar`);
        console.log(`${'5'.white} Completar tarea/s`);
        console.log(`${'6'.white} Borrar tarea`);
        console.log(`${'0'.white} Salir\n`);


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: \n', (opt) => {

            readline.close();
            resolve(opt);
        });


    })



}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'ENTER'} para continuar\n`, (opt) => {

            readline.close();
            resolve();
        });

    })


}


module.exports = {
    mostrarMenu,
    pausa
}
