const express = require('express')
const moment = require('moment');
const fecha = moment().format("DD MMMM YYYY, hh:mm:ss");
const fs = require('fs').promises;
const app = express()

app.use(express.static('public'))

app.get('/crear', async(req,res) =>{
    //guarda el archivo en la carpeta archivos
    let nombre_archivo = `archivos/${req.query.nombre}.txt`;
    let contenido = req.query.contenido;
    let contenido_archivo = ` fecha: ${fecha}
    creado el archivo ${nombre_archivo}, 
    contenido:${contenido}`;
    await fs.writeFile(nombre_archivo, contenido_archivo, "utf-8");
    console.log(req.query);
    console.log(nombre_archivo);
    res.send('archivo creado');
})

app.get("/leer", async(req, res)=>{
    //try catch si lo de edntro del try me genera error mostrar el emnsaje
    try {
        await fs.readFile(`archivos/${req.query.nombreLeer}.txt`);
    }
    catch(error){
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente');  
        }
    }
    res.send("archivo leido")
});

app.get("/renombrar", async (req, res)=>{

    
    let nombreRenombrar = req.query.nombreRenombrar;
    let nombreCambiado = req.query.nombreCambiado;
    //

    try {
        await fs.rename(`archivos/${req.query.nombreRenombrar}.txt)`, `archivos/${req.query.nombreCambiado}.txt`);

    } catch (error) {
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente')
        }
    }
    res.send("archivo  renombrar es:" + nombreCambiado);
    
});

app.get("/eliminar", async (req, res) =>{
    try {
        await fs.unlink(`archivos/${req.query.nombreEliminar}.txt`);
    } catch (error) {
        if (error.code = 'ENOENT') {
            return res.send('archivo inexistente');
        }
    }
    res.send("archivo eliminado");
});
//agregaer despees mostrar mensaje de elliminado 3s

app.get("*", (req, res)=>{
    res.send("archivo no encontrado");
});

app.listen(3000, function(){
    console.log('servidor ejecutado por extres')
})


