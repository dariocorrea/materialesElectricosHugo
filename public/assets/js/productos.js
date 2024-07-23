const generarHTMLABMproductos = async (productos) => {
	let listaHTML = ''

	productos.forEach((producto, i) => {
		listaHTML += ` 
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="product-item fix mb-30">
					<div class="product-thumb">
						<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
						<div class="product-action-link">                                                
							<a href="" onclick="getEditarProducto(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view_abm"> <span data-toggle="tooltip" data-placement="left" title="Editar"><i class="fa fa-pencil"></i></span> </a>
							<a href="#listado" onclick="eliminarProducto(${producto.IdProducto})"> <span data-toggle="tooltip" data-placement="left" title="Eliminar"><i class="fa fa-trash-o"></i></span> </a>
						</div>
					</div>
					<div class="product-content">
						<h4>${producto.NombreProducto}</h4>
						<h3>${producto.NombreMarca}</h3>
						<h4></h4>
						<div class="pricebox">
							<span class="regular-price">$${producto.PrecioVenta}</span>
						</div>
					</div>
				</div>
				<div class="product-list-item mb-30">
					<div class="product-thumb">
						<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
					</div>
					<div class="product-list-content">
						<h3>${producto.NombreProducto}</h3>
						<h4>${producto.NombreMarca}</h4>
						<div class="pricebox">
							<span class="regular-price">$${producto.PrecioVenta}</span>
						</div>
						<p>${producto.DescripcionProducto}</p>						
						<div class="product-list-action-link">
							<a href="" onclick="getEditarProducto(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view_abm"> <span data-toggle="tooltip" data-placement="left" title="Editar"><i class="fa fa-pencil"></i></span> </a>
							<a href="" onclick="eliminarProducto(${producto.IdProducto})"> <span data-toggle="tooltip" data-placement="left" title="Eliminar"><i class="fa fa-trash-o"></i></span> </a>						</div>
					</div>
				</div>
			</div>
		`;
	  });

	  return listaHTML
}

const limpiarCampos = async () => {
	let idProd = document.getElementById("idProducto")
	let imagenProducto = document.getElementById("imagenActual")
	let nombreImagen = document.getElementById("nombreImagenActual")
	let imagenNueva = document.getElementById("imagenNueva")
	let nombreProducto = document.getElementById("nombre")
	let codigoProducto = document.getElementById("codigo")
	let descripcionProducto = document.getElementById("descripcion")
	let precioCompra = document.getElementById("precioCompra")
	let precioVenta = document.getElementById("precioVenta")
	let stockProducto = document.getElementById("stock")

	imagenProducto.src = ""
	nombreImagen.innerHTML = ""
	imagenNueva.value = ""
	idProd.innerHTML = 0
	nombreProducto.value = ""
	codigoProducto.value = ""
	descripcionProducto.value = ""
	precioCompra.value = ""
	precioVenta.value = ""
	stockProducto.value = ""
}

const cargarCombos = async (idCategoria, idMarca) => {
	let categoriaProducto = document.getElementById("categoria")
	let marcaProducto = document.getElementById("marca")
	
	const lCategorias = await buscarCategorias(0)
	const lMarcas = await buscarMarcas(0)

	categoriaProducto.innerHTML = ""
	lCategorias.forEach((categoria, i) => {
		if (categoria.IdCategoria == idCategoria) {
			categoriaProducto.innerHTML += `
				<option value="${categoria.IdCategoria}" selected>${categoria.NombreCategoria}</option>
			`
		}
		else{
			categoriaProducto.innerHTML += `
				<option value="${categoria.IdCategoria}">${categoria.NombreCategoria}</option>
			`
		}
	})

	marcaProducto.innerHTML = ""
	lMarcas.forEach((marca, i) => {
		if (marca.IdMarca == idMarca) {
			marcaProducto.innerHTML += `
				<option value="${marca.IdMarca}" selected>${marca.NombreMarca}</option>
			`
		}
		else{
			marcaProducto.innerHTML += `
				<option value="${marca.IdMarca}">${marca.NombreMarca}</option>
			`
		}
	})
}

const getCrearProducto = async (idProducto) => {
	let titulo = document.getElementById("tituloModal")	
	titulo.textContent = "Crear Producto"

	let myForm = document.getElementById("myForm")
	myForm.setAttribute("onsubmit","crearProducto()")

	let btnActualizar = document.getElementById("btnActualizar")
	let btnCrear = document.getElementById("btnCrear")
	btnCrear.removeAttribute("hidden")
	btnActualizar.setAttribute("hidden", true)

	await limpiarCampos()
	await cargarCombos(1,1)

	const btnCrearModal = document.getElementById("btnCrearModal")
	btnCrearModal.click()
}

const crearProducto = async () => {
	let imagenNueva = document.getElementById("imagenNueva")
	let nombreProducto = document.getElementById("nombre")
	let codigoProducto = document.getElementById("codigo")
	let categoriaProducto = document.getElementById("categoria")
	let marcaProducto = document.getElementById("marca")
	let descripcionProducto = document.getElementById("descripcion")
	let precioCompra = document.getElementById("precioCompra")
	let precioVenta = document.getElementById("precioVenta")
	let stockProducto = document.getElementById("stock")

	let img = ""
    if (imagenNueva.value.includes("fakepath")) {
        img = imagenNueva.value.substr(12);
    }

	const body = JSON.stringify({
		nombreProducto: nombreProducto.value,
		codigoProducto: codigoProducto.value,
		idCategoria: categoriaProducto.value,
		idMarca: marcaProducto.value,
		precioCompra: parseFloat(precioCompra.value),
		precioVenta: parseFloat(precioVenta.value),
		descripcionProducto: descripcionProducto.value,
		imagen: img,
		stock: parseInt(stockProducto.value)
	});

	//Subo archivo al servidor si cargó la imagen
	if (img != "") {
		let fd = new FormData();
		fd.append("imagen", document.getElementById("imagenNueva").files[0]);

		const resArch =  await fetch(`/upload`, {
			method: 'POST',
			body: fd
		})
	}

	const token = localStorage.getItem('jwt-token')

	try{
		const res =  await fetch(`/crearProducto`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: body
		})

		alert("Producto creado exitosamente 🙌")
	}
	catch
	{
		alert("Error al crear el producto. Por favor, inténtalo de nuevo. 🔄")
	}

	// if (!res.ok) {
    //     alert("Error al crear el producto. Por favor, inténtalo de nuevo. 🔄")
    //     throw Error("Error al crear el producto. Por favor, inténtalo de nuevo. 🔄")
    // }

	const btnClose = document.getElementById("modalClose")
	btnClose.click()

	window.location.href = "/productos.html"
}

const getEditarProducto = async (idProducto) => {
	let titulo = document.getElementById("tituloModal")
	let idProd = document.getElementById("idProducto")
	let imagenProducto = document.getElementById("imagenActual")
	let nombreImagen = document.getElementById("nombreImagenActual")
	let imagenNueva = document.getElementById("imagenNueva")
	let nombreProducto = document.getElementById("nombre")
	let codigoProducto = document.getElementById("codigo")
	let categoriaProducto = document.getElementById("categoria")
	let marcaProducto = document.getElementById("marca")
	let descripcionProducto = document.getElementById("descripcion")
	let precioCompra = document.getElementById("precioCompra")
	let precioVenta = document.getElementById("precioVenta")
	let stockProducto = document.getElementById("stock")
	let btnActualizar = document.getElementById("btnActualizar")
	let btnCrear = document.getElementById("btnCrear")
	btnActualizar.removeAttribute("hidden")
	btnCrear.setAttribute("hidden", true)

	let myForm = document.getElementById("myForm")
	myForm.setAttribute("onsubmit","actualizarProducto()")

	const lProductos = await buscarProducto(idProducto)
	const producto = lProductos[0]

	await cargarCombos(producto.IdCategoria, producto.IdMarca)

	titulo.textContent = "Actualizar Producto"
	imagenProducto.src = `assets/uploads/${producto.Imagen}`
	nombreImagen.innerHTML = producto.Imagen
	imagenNueva.value = ""
	idProd.innerHTML = idProducto
	nombreProducto.value = producto.NombreProducto
	codigoProducto.value = producto.CodigoProducto
	categoriaProducto.value = producto.IdCategoria
	marcaProducto.value = producto.IdMarca
	descripcionProducto.value = producto.DescripcionProducto
	precioCompra.value = producto.PrecioCompra
	precioVenta.value = producto.PrecioVenta
	stockProducto.value = producto.Stock
}

const actualizarProducto = async () => {
	let idProd = document.getElementById("idProducto")
	let imagenProducto = document.getElementById("imagenActual")
	let nombreImagen = document.getElementById("nombreImagenActual")
	let imagenNueva = document.getElementById("imagenNueva")
	let nombreProducto = document.getElementById("nombre")
	let codigoProducto = document.getElementById("codigo")
	let categoriaProducto = document.getElementById("categoria")
	let marcaProducto = document.getElementById("marca")
	let descripcionProducto = document.getElementById("descripcion")
	let precioCompra = document.getElementById("precioCompra")
	let precioVenta = document.getElementById("precioVenta")
	let stockProducto = document.getElementById("stock")

	let img = ""
    if (imagenNueva.value.includes("fakepath")) {
        img = imagenNueva.value.substr(12);
    }

	const imagen = img == "" ? nombreImagen.textContent : img

	const body = JSON.stringify({
		idProducto: parseInt(idProd.textContent),
		nombreProducto: nombreProducto.value,
		codigoProducto: codigoProducto.value,
		idCategoria: categoriaProducto.value,
		idMarca: marcaProducto.value,
		precioCompra: parseFloat(precioCompra.value),
		precioVenta: parseFloat(precioVenta.value),
		descripcionProducto: descripcionProducto.value,
		imagen,
		stock: parseInt(stockProducto.value)
	});

	const token = localStorage.getItem('jwt-token')

	const res =  await fetch(`/actualizarProducto?_metodo=PUT`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: body
	})

	if (!res.ok) {
        alert("Error al actualizar el producto. Por favor, inténtalo de nuevo. 🔄")
        throw Error("Error al actualizar el producto. Por favor, inténtalo de nuevo. 🔄")
    }

	//Subo archivo al servidor si cambió la imagen
	if (img != "" && nombreImagen.textContent != img) {
		let fd = new FormData();
		fd.append("imagen", document.getElementById("imagenNueva").files[0]);

		const resArch =  await fetch(`/upload`, {
			method: 'POST',
			body:  fd
		})
	}
    alert("Producto actualizado exitosamente 🙌")
	const btnClose = document.getElementById("modalClose")
	btnClose.click()

	window.location.href = "/productos.html"
}

const eliminarProducto = async (idProducto) => {
	let respuesta = confirm("Esta seguro que desea eliminar el producto? 🚨")

	if (respuesta) {

        const token = localStorage.getItem('jwt-token')
        const body = JSON.stringify({
            idProducto
        });

        const res = await fetch(`/eliminarProducto?_metodo=DELETE`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: body
        })

        if (!res.ok) {
            alert("Error al eliminar el producto. Por favor, inténtalo de nuevo. 🔄")
            throw Error("Error al eliminar el producto. Por favor, inténtalo de nuevo. 🔄")
        }

        alert("Producto eliminado exitosamente 👍🗑️")
        window.location.href = "/productos.html"
    }
}
 

listadoProductos(null, 0, true)

const busquedaPorNombreABM = async () => {
	let search = document.getElementById("search")
	//window.location.href = `/productos.html?search=${search.value}`
	listadoProductos(search.value, 0, true)
}