const express = require('express');
const fs = require("fs");

const router = express.Router();
const controladores = require('../controllers/mainControllerProducto');

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
    if (!fs.existsSync(`public/assets/uploads/${file.originalname}`)) {
        return cb(null, true);
    } else {
        //return cb('Ya existe', true);
        return cb(null, true);
    }
}

const uploadFile = multer({ storage })
// const uploadFile = multer({ storage
//     fileFilter: function(req, file, cb) {
//         checkFileExist(file, cb);
        
//       }
//  })

router.get('/listaProductos/:id', controladores.getListaProductos)
router.get('/detalleProducto/:id', controladores.getDetalleProducto)
router.get('/busquedaProductos', controladores.busquedaProductos)
router.get('/listadoCategorias/:id', controladores.getListaCategorias)
router.get('/listadoMarcas/:id', controladores.getListaMarcas)

router.put('/actualizarStock', controladores.actualizarStock)
router.put('/actualizarProducto', controladores.actualizarProducto)

router.delete('/eliminarProducto', controladores.eliminarProducto);

router.post('/crearProducto', controladores.crearProducto);

router.post('/upload', uploadFile.single('imagen'), (req, res) => {
    res.status(200).send({ message:"Archivo subido exitosamente"})
  });

module.exports = router;