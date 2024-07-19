const { conn } = require('../db/dbconnect');

module.exports = {
    getListaProductos: async (req, res) => {
        try {
            const idCategoria = req.params.id
            console.log(idCategoria) 
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
            console.log(idProducto) 
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

    actualizarStock: async (req, res) => {
        try {
            console.log(req.body);
            const sql = `UPDATE producto SET Stock=? WHERE IdProducto=?`;
            const { idProducto, stockNuevo} = req.body;

            const modificado = await conn.query(sql, [stockNuevo, idProducto]);
            console.log('Stock actualizado exitosamente');

            //res.redirect('/producto');
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

            //res.redirect('/producto');
            res.status(200).send({ message:"Producto actualizado exitosamente"})
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send({ message: "Error al actualizar el producto. Por favor, inténtalo de nuevo." })
        }
    },



    getProducto: async (req, res) => {
        try {
            const [registros] = await conn.query(`SELECT p.*, v.nombre AS nombre_variedad
                                                    FROM producto p 
                                                    JOIN variedad v ON p.variedad_id = v.id`);

            const [variedades] = await conn.query(`SELECT * FROM variedad`);

            // Aquí cambia `producto` por `productos` para asegurarse de que coincida con el nombre que estás utilizando en la vista
            res.render('producto', { productos: registros, variedades: variedades, tituloDePagina: 'Listado de Productos' });
        } catch (error) {
            throw error;
        } finally {
            conn.releaseConnection();
        }
    },

    crearRegistro: async (req, res) => {
        try {
            console.log(req.body);
            const sql = `INSERT INTO producto (nombre, caracteristicas, imagen, precio, gramaje, variedad_id) VALUES (?,?,?,?,?,?);`;
            const creado = await conn.query(sql, [req.body.nombre, req.body.caracteristicas, req.body.imagen, parseFloat(req.body.precio), req.body.gramaje, req.body.variedad_id]);
            console.log('Producto creado exitosamente');
            res.redirect('/producto');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).send({ message: "Error al crear el producto. Por favor, inténtalo de nuevo." })

            //res.send('Error al crear el producto. Por favor, inténtalo de nuevo.');
        }
    },

    getModificar: async (req, res) => {
        const [modificar] = await conn.query(`SELECT *, imagen FROM producto WHERE id=?`, [req.params.id]);

        const [variedades] = await conn.query(`SELECT * FROM variedad`);

        res.render('modificar', {
            tituloDePagina: 'Modificar Items',
            registro: modificar[0],
            variedades: variedades,
            imagen: modificar[0].imagen // Asegúrate de que la imagen esté definida
        });
    },

    actualizar: async (req, res) => {
        try {
            console.log(req.body);
            const sql = `UPDATE producto SET nombre=?, caracteristicas=?, imagen=?, precio=?, gramaje=?, variedad_id=? WHERE id=?`;
            const { idMod, nombre, caracteristicas, imagen, precio, gramaje, variedad_id, imagenActual } = req.body;
            const img = imagen == "" ? imagenActual : imagen;
            const modificado = await conn.query(sql, [nombre, caracteristicas, img, precio, gramaje, variedad_id, idMod]);
            console.log('Producto actualizado exitosamente');
            res.redirect('/producto');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send({ message: "Error al actualizar el producto. Por favor, inténtalo de nuevo." })

            //res.send('Error al actualizar el producto. Por favor, inténtalo de nuevo.');
        }
    },

    eliminar: async (req, res) => {
        try {
            console.log(req.body);
            const eliminado = await conn.query(`DELETE FROM producto WHERE id=?`, req.body.idEliminar);
            console.log('Producto eliminado exitosamente');
            res.redirect('/producto');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send({ message: "Error al eliminar el producto. Por favor, inténtalo de nuevo." })

        }
    },

    suscribir: async (req, res) => {
        const { firstname, lastname, birthDate, street, city, zipcode, color, email, spice1, spice2, spice3 } = req.body;
        console.log(req.body);
        try {
            const sql = `INSERT INTO newsletter (firstname, lastname, birthDate, street, city, zipcode, color, email, spice1, spice2, spice3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const suscripcion = await conn.query(sql, [firstname, lastname, birthDate, street, city, zipcode, color, email, spice1, spice2, spice3]);

            console.log('Datos registrados con éxito');
            res.send('Datos registrados con éxito');
        } catch (error) {
            console.error('Error al insertar datos en la base de datos:', error);
            res.send('Error al insertar datos en la base de datos. Por favor, inténtalo de nuevo.');
        }
    },

    contactar: async (req, res) => {
        const { firstname, lastname, birthDate, email, telefono, city, conociste, pago, imageInput, mensaje } = req.body;
        console.log(req.body);
        try {
            const sql = `INSERT INTO contacto (firstname, lastname, birthDate, email, telefono, city, conociste, pago, imageInput, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const myform = await conn.query(sql, [firstname, lastname, birthDate, email, telefono, city, conociste, pago, imageInput, mensaje]);

            console.log('Datos registrados con éxito');
            res.send('Datos registrados con éxito');
        } catch (error) {
            console.error('Error al insertar datos en la base de datos:', error);
            res.send('Error al insertar datos en la base de datos. Por favor, inténtalo de nuevo.');
        }
    }
}