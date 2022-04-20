const fs = require('fs');
const { stringify } = require('querystring');


const archivo = './db/data.json';//constante con el path de donde se guarda el archivo y formato

// funcion que me permite guardar la tarea que se genere con el fs de node
const guardarDB = (data) => {



    fs.writeFileSync(archivo, JSON.stringify(data));//llamo al fs y mando el path con la data que la voy a obtener como argumento desde app.js
    //uso el metodo json.stringify para crear un string de tipo json porque el argumento debe ser un string y no un arreglo.
}


const leerDB = () => {

    if (!fs.existsSync(archivo)) {
        return null;

    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    console.log(data);

    return data;

}



module.exports = {
    guardarDB,
    leerDB
}