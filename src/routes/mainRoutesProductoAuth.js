const express = require('express');
const router = express.Router();
const controladores = require('../controllers/mainControllerProducto');

// const multer = require('multer')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, `public/img/`)
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + "_" + file.originalname)
//     }
// })

// const uploadFile = multer({ storage })

router.get('/listaProductos/:id', controladores.getListaProductos);
router.get('/detalleProducto/:id', controladores.getDetalleProducto);
router.get('/busquedaProductos', controladores.busquedaProductos);
router.get('/listadoCategorias/:id', controladores.getListaCategorias);

router.put('/actualizarStock', controladores.actualizarStock)

//router.get('/producto', controladores.getProducto);
//router.post('/producto', uploadFile.single('imagen'), controladores.crearRegistro);//ejecuta multer
router.post('/contactar', controladores.contactar);
router.post('/suscribir', controladores.suscribir);
router.post('/producto', controladores.crearRegistro);
router.get('/bienvenido', (req, res) => {
res.render('bienvenido'); // Renderiza el archivo bienvenido.ejs
});

//router.get('/modificar/:id', controladores.getModificar);
router.put('/modificar', controladores.actualizar); // Modifica la ruta y asóciala al método PUT // era /modificar/:id
router.delete('/producto', controladores.eliminar);

module.exports = router;