const { conn } = require('../db/dbconnect');

module.exports = {
    getListaProductos: async (req, res) => {
        try {
            const idCategoria = req.params.id
            //console.log(idCategoria) 
            const [productos] = await conn.query(`SELECT p.*, c.NombreCategoria, m.NombreMarca 
                                                    FROM producto p 
                                                    JOIN categoriaproducto c 
                                                      ON p.IdCategoria = c.IdCategoria 
                                                    JOIN marca m 
                                                      ON p.IdMarca = m.IdMarca
                                                   WHERE (p.IdCategoria = ${idCategoria} 
                                                      OR ${idCategoria} = 0) `);

            res.json(productos);
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    getListaCategorias: async (req, res) => {
        try {
            const idCategoria = req.params.id

            const [categorias] = await conn.query(`SELECT * FROM categoriaproducto  
                                                    WHERE (IdCategoria = ${idCategoria} 
                                                      OR ${idCategoria} = 0) `);

            res.json(categorias);
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    getListaMarcas: async (req, res) => {
        try {
            const idMarca = req.params.id

            const [marcas] = await conn.query(`SELECT * FROM marca 
                                                    WHERE (IdMarca = ${idMarca} 
                                                      OR ${idMarca} = 0) `);

            res.json(marcas);
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    getDetalleProducto: async (req, res) => {
        try {
            const idProducto = req.params.id
            //console.log(idProducto) 
            const [productos] = await conn.query(`SELECT p.*, c.NombreCategoria, m.NombreMarca 
                                                    FROM producto p 
                                                    JOIN categoriaproducto c 
                                                      ON p.IdCategoria = c.IdCategoria 
                                                    JOIN marca m 
                                                      ON p.IdMarca = m.IdMarca
                                                   WHERE p.IdProducto = ${idProducto} `);

            res.json(productos);
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    busquedaProductos: async (req, res) => {
        try {
            console.log(req.query.search)
            const search = req.query.search

            const [productos] = await conn.query(`SELECT p.*, c.NombreCategoria, m.NombreMarca 
                                                    FROM producto p 
                                                    JOIN categoriaproducto c 
                                                      ON p.IdCategoria = c.IdCategoria 
                                                    JOIN marca m 
                                                      ON p.IdMarca = m.IdMarca
                                                   WHERE p.NombreProducto LIKE '%${search}%' `);

            res.json(productos);

        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    buscarProducto: async (req, res) => {
        try {
            const search = req.query.search
            const idProducto = req.query.idProducto
            const [productos] = await conn.query(`SELECT p.*
                                                    FROM producto p 
                                                   WHERE (p.NombreProducto = '${search}' 
                                                      OR p.CodigoProducto = '${search}')
                                                     AND IdProducto != ${idProducto}
                                                   LIMIT 1`);

            res.json(productos);

        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    actualizarStock: async (req, res) => {
        try {
            //console.log(req.body);
            const sql = `UPDATE producto SET Stock=? WHERE IdProducto=?`;
            const { idProducto, stockNuevo} = req.body;

            const modificado = await conn.query(sql, [stockNuevo, idProducto]);
            //console.log('Stock actualizado exitosamente');

            res.status(200)
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            res.status(500).send({ message: "Error al actualizar el stock. Por favor, inténtalo de nuevo." })
        }
    },

    actualizarProducto: async (req, res) => {
        try {
            console.log(req.body);
            const sql = `UPDATE producto SET NombreProducto=?, CodigoProducto=?, IdCategoria=?, IdMarca=?, PrecioCompra=?,
                                             PrecioVenta=?, DescripcionProducto=?, Imagen=?, Stock=?
                          WHERE IdProducto=?`;
            const { idProducto, nombreProducto, codigoProducto, idCategoria, idMarca, precioCompra, precioVenta, descripcionProducto, imagen, stock} = req.body;
            const modificado = await conn.query(sql, [nombreProducto, codigoProducto, idCategoria, idMarca, precioCompra, precioVenta, descripcionProducto, imagen, stock, idProducto]);
            console.log('Producto actualizado exitosamente');

            res.status(200).send({ message:"Producto actualizado exitosamente"})
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send({ message: "Error al actualizar el producto. Por favor, inténtalo de nuevo." })
        }
    },

    eliminarProducto: async (req, res) => {
        try {
            console.log(req.body);
            const eliminado = await conn.query(`DELETE FROM producto WHERE IdProducto=?`, req.body.idProducto);
            console.log('Producto eliminado exitosamente');
            
            res.status(200).send({ message:"Producto eliminado exitosamente"})
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send({ message: "Error al eliminar el producto. Por favor, inténtalo de nuevo." })
        }
    },

    crearProducto: async (req, res) => {
        try {
            console.log(req.body);
            const sql = `INSERT INTO producto (NombreProducto, CodigoProducto, IdCategoria, IdMarca, PrecioCompra, PrecioVenta, DescripcionProducto, Imagen, Stock) 
                                       VALUES (?,?,?,?,?,?,?,?,?);`;
            const { nombreProducto, codigoProducto, idCategoria, idMarca, precioCompra, precioVenta, descripcionProducto, imagen, stock} = req.body;
            const creado = await conn.query(sql, [nombreProducto, codigoProducto, idCategoria, idMarca, precioCompra, precioVenta, descripcionProducto, imagen, stock]);
            console.log('Producto creado exitosamente');
            
            res.status(200).send({ message:"Producto creado exitosamente"})
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).send({ message: "Error al crear el producto. Por favor, inténtalo de nuevo." })
        }
    }
}