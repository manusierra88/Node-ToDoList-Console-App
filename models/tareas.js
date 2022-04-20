const Tarea = require("./tarea");


class Tareas {

    _listado = {}

    //con un get puedo obtener el contenido del listado en forma de array

    get listadoArr() {
        const listado = [];
        //uso la funcion objetc de js que me permite pasar las key de un objeto y lo puedo mandar a un array
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            // console.log(key);
            listado.push(tarea);
        });
        return listado;
    }


    constructor() {
        this._listado = {}
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {//si la propiedad del objeto dentro del _listado existe

            delete this._listado[id];//llamo a esta funcion que borrar esa propiedad (id) y por ende lo borra de la BD

        }

    }

    cargarTareafromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });



    }


    crearTarea(description = '') {

        const tarea = new Tarea(description);

        this._listado[tarea.id] = tarea;


    }


    listadoCompletoTareas() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { description, completadoEn } = tarea;//desestructuro la tarea, la description es parte de la declaracion de la clase
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`\n${idx} ${description}:: ${estado}\n`);
        })
    }


    listaTareasCompletadas(completa = true) {

        let contador = 0;

        this.listadoArr.forEach(tarea => {
            const { description, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completa) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`\n${contador.toString().green} ${description} :: ${completadoEn.green}`);

                }

            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`\n${contador.toString().green} ${description} :: ${estado.red}`);


                }
            }

        })


    }
    toggleTareasCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;

            }
        });
    }
}



module.exports = Tareas;