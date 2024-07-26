const express = require('express');
const fs = require("fs");

const router = express.Router();
const controladores = require('../controllers/mainControllerProducto');
const excel = require('../controllers/excelController')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/assets/uploads/`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const checkFileExist = async(file, cb) => {
    // if (fs.existsSync(`public/assets/uploads/${file.originalname}`)) {
    //     fs.unlink(`public/assets/uploads/${file.originalname}`)
    // }
    return cb(null, true);
}

const uploadFile = multer({ storage })
// const uploadFile = multer({ storage,
//     fileFilter: function(req, file, cb) {
//         checkFileExist(file, cb);
//       }
//  })

router.get('/listaProductos/:id', controladores.getListaProductos)
router.get('/detalleProducto/:id', controladores.getDetalleProducto)
router.get('/busquedaProductos', controladores.busquedaProductos)
router.get('/buscarProducto', controladores.buscarProducto)
router.get('/listadoCategorias/:id', controladores.getListaCategorias)
router.get('/listadoMarcas/:id', controladores.getListaMarcas)

router.put('/actualizarStock', controladores.actualizarStock)
router.put('/actualizarProducto', controladores.actualizarProducto)

router.delete('/eliminarProducto', controladores.eliminarProducto);

router.post('/crearProducto', controladores.crearProducto);

router.post('/upload', uploadFile.single('archivo'), (req, res) => {
    res.status(200).send({ message:"Archivo subido exitosamente"})
});

router.get('/descargarExcel', excel.descargarExcel)
router.get('/cargarExcel', excel.cargarExcel)
router.get('/eliminarExcel', excel.eliminarExcel)

module.exports = router;