const XLSX2 = require('xlsx')
const XLSX = require('xlsx-populate')
const controladores = require('../controllers/mainControllerProducto');
const { conn } = require('../db/dbconnect');
const fs = require("fs");

module.exports = {
    getListaProductos: async () => {
        try {
            const [productos] = await conn.query(`SELECT p.*, c.NombreCategoria, m.NombreMarca 
                                                    FROM producto p 
                                                    JOIN categoriaproducto c 
                                                      ON p.IdCategoria = c.IdCategoria 
                                                    JOIN marca m 
                                                      ON p.IdMarca = m.IdMarca`);

            return productos
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    buscarProducto: async (nombreProducto, codigoProducto) => {
        try {
            const [producto] = await conn.query(`SELECT * 
                                                 FROM producto p 
                                                WHERE NombreProducto = '${nombreProducto}'
                                                  AND CodigoProducto = '${codigoProducto}'
                                                LIMIT 1`);

            return producto[0]
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    actualizarProducto: async (producto) => {
        try {
            //console.log(producto)
            const sql = `UPDATE producto p
                           JOIN categoriaproducto c 
                             ON c.NombreCategoria = ?
                           JOIN marca m 
                             ON m.NombreMarca = ?
                            SET NombreProducto=?, CodigoProducto=?, p.IdCategoria= c.IdCategoria, p.IdMarca= m.IdMarca, 
                                PrecioCompra=?, PrecioVenta=?, DescripcionProducto=?, Stock=?                            
                          WHERE p.IdProducto=?`;

            const { idProducto, nombreProducto, codigoProducto, nombreCategoria, nombreMarca, precioCompra, precioVenta, descripcionProducto, stock} = producto;
            const modificado = await conn.query(sql, [nombreCategoria, nombreMarca, nombreProducto, codigoProducto, precioCompra, precioVenta, descripcionProducto, stock, idProducto]);

        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    crearProducto: async (producto) => {
        try {
            //console.log(producto)
            const sql = `INSERT INTO producto (NombreProducto, CodigoProducto, IdCategoria, IdMarca, PrecioCompra, PrecioVenta, DescripcionProducto, Stock) 
                         SELECT ?, ?, c.IdCategoria, m.IdMarca, ?, ?, ?, ?
                           FROM categoriaproducto c
                           JOIN marca m 
                             ON c.NombreCategoria = ?
                            AND m.NombreMarca = ?`;

            const { idProducto, nombreProducto, codigoProducto, nombreCategoria, nombreMarca, precioCompra, precioVenta, descripcionProducto, stock} = producto;
            const creado = await conn.query(sql, [nombreProducto, codigoProducto, precioCompra, precioVenta, descripcionProducto, stock, nombreCategoria, nombreMarca]);

        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    descargarExcel: async (req, res) => {
        const archivo = "Template_ListaMateriales.xlsx"
        const rutaTmp = `./public/assets/templates/${archivo}`
        const rutaSalida = `./public/assets/uploads/${archivo}`

        let data = await module.exports.getListaProductos()

        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        // data = data.concat(data)
        
        // console.log(data.length)

        const wb = await XLSX.fromFileAsync(rutaTmp)

        let registros = []
        data.forEach((producto, i) => {
            let registro = [producto.NombreProducto, producto.CodigoProducto, producto.NombreCategoria, producto.NombreMarca,
                            producto.PrecioCompra, producto.PrecioVenta, producto.DescripcionProducto, producto.Stock]

            registros.push(registro)
        })

        wb.sheet(0).cell("A2").value(registros)
        wb.toFileAsync(rutaSalida)

        res.json(archivo);
    },
    
    cargarExcel: async (req, res) => {
        const archivo = req.query.archivo
        const ruta = `./public/assets/uploads/${archivo}`

        const workbook = await XLSX2.readFile(ruta)
        const workSheets = workbook.SheetNames
        const sheet = workSheets[0]
        const data = XLSX2.utils.sheet_to_json(workbook.Sheets[sheet])

        data.forEach(async (producto, i) => {
            let prodExiste = await module.exports.buscarProducto(producto["Nombre Producto"], producto["Código Producto"])
            if (prodExiste)
            {
                //console.log(prodExiste)
                const prod = {
                    idProducto: parseInt(prodExiste.IdProducto),
                    nombreProducto: producto["Nombre Producto"],
                    codigoProducto: producto["Código Producto"],
                    nombreCategoria: producto["Categoria"],
                    nombreMarca: producto["Marca"],
                    precioCompra: parseFloat(producto["Precio Compra"]),
                    precioVenta: parseFloat(producto["Precio Venta"]),
                    descripcionProducto: producto["Descripción Producto"],
                    stock: parseInt(producto["Stock"])
                }
                //console.log(prod)
                await module.exports.actualizarProducto(prod)
            }
            else {
                const prod = {
                    nombreProducto: producto["Nombre Producto"],
                    codigoProducto: producto["Código Producto"],
                    nombreCategoria: producto["Categoria"],
                    nombreMarca: producto["Marca"],
                    precioCompra: parseFloat(producto["Precio Compra"]),
                    precioVenta: parseFloat(producto["Precio Venta"]),
                    descripcionProducto: producto["Descripción Producto"],
                    stock: parseInt(producto["Stock"])
                }
                await module.exports.crearProducto(prod)
            }
        })

        fs.unlinkSync(ruta)

        res.json(archivo);
    },

    eliminarExcel: async (req, res) => {
        const archivo = req.query.archivo
        const ruta = `./public/assets/uploads/${archivo}`

        fs.unlinkSync(ruta)
    }
}