
const detalleProducto = async (idProducto) => {
	let imagenProducto = document.getElementById("imagenProductoDet")
	let nombreProducto = document.getElementById("nombreProductoDet")
	let codigoProducto = document.getElementById("codigoProductoDet")
	let marcaProducto = document.getElementById("marcaProductoDet")
	let stockProducto = document.getElementById("stockProductoDet")
	let precioProducto = document.getElementById("precioProductoDet")
	let descripcionProducto = document.getElementById("descripcionProductoDet")

	const lProductos = await buscarProducto(idProducto)
	const producto = lProductos[0]

	imagenProducto.src = `assets/uploads/${producto.Imagen}`
	nombreProducto.innerHTML = producto.NombreProducto
	codigoProducto.innerHTML =  `Código Producto: ${producto.IdProducto}`
	marcaProducto.innerHTML = producto.NombreMarca
	stockProducto.innerHTML = `${producto.PrecioCompra} en Stock`
	precioProducto.innerHTML = `$${producto.PrecioVenta}`
	descripcionProducto.innerHTML = producto.DescripcionProducto
}

const path = window.location.href
const idProducto = path.split("idProducto=")[1]

detalleProducto(idProducto)