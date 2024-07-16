let resultados
const elementosPorPagina = 4
let cantTotalProductos
let paginaActual = 1

const avanzarPagina = async() => {
	paginaActual = paginaActual + 1
	llenarGrillaProductos()
}

const retrocederPagina = async() => {
	paginaActual = paginaActual - 1
	llenarGrillaProductos()
}

const cambiarPagina = async(pagina) => {	
	if (paginaActual !== pagina) {
		paginaActual = pagina		
		llenarGrillaProductos()
	}
}

const obtenerPaginacionDeDatos = async (paginaActual, productos) => {
	const corteDeInicio = (paginaActual - 1) * elementosPorPagina
	const corteDeFinal = corteDeInicio + elementosPorPagina
	return productos.slice(corteDeInicio, corteDeFinal)
}

const obtenerPaginasTotales = async () =>  {
	return Math.ceil(resultados.length / elementosPorPagina)
}

const gestionarBotones = async () => {
	const anterior = document.querySelector(`#anterior`)
	const siguiente = document.querySelector(`#siguiente`)
	const pagNro = document.querySelector(`#pagina_${paginaActual}`)

	pagNro.setAttribute("class", "active")

	if (paginaActual === 1) {
		anterior.removeAttribute("onclick")
		anterior.removeAttribute("href")
	} else {
		anterior.setAttribute("onclick", "retrocederPagina()")
		anterior.setAttribute("href","#listado")
	}
	if (paginaActual === await obtenerPaginasTotales()) {
		siguiente.removeAttribute("onclick")
		siguiente.removeAttribute("href")
	} else {
		siguiente.setAttribute("onclick", "avanzarPagina()")
		siguiente.setAttribute("href","#listado")
	}
}


const buscarListado = async (idCategoria = 0) => {
	const token = localStorage.getItem('jwt-token')
  
	const res = await fetch(`/listaProductos/${idCategoria}`, {
	  method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
  
	  }
	})
  
	if (!res.ok) {
	  window.location.href = "/login.html"
  
	  throw Error("Problemas en login")
	}
  
	const data = await res.json()
  
	return data
}

const llenarGrillaProductos = async () => {
	let listaHTML = document.querySelector(`#listado`)
	let paginacion = document.querySelector(`#paginacion`)

	listaHTML.innerHTML = ''
  	paginacion.innerHTML = ''

	if (resultados.length == 0) {
		listaHTML.innerHTML = '<h1 style="color:#F4CE14; text-align: center; margin: 0 auto; width: 50%;">"No se encontraron resultados"</h1>';

	} else {
		const paginasTotales = await obtenerPaginasTotales()

		const listaResult = await obtenerPaginacionDeDatos(paginaActual, resultados)

		const mostrarCantidad = document.querySelector(`#cantProductos`)

		mostrarCantidad.innerHTML = `${cantTotalProductos} resultados`
		paginacion.innerHTML += `
				<li><a class="Previous" id="anterior" href="#listado" onclick=retrocederPagina()>Anterior</a></li>
				 `

		for (let i = 1; i <= paginasTotales; i++) {
			paginacion.innerHTML += `
				<li id="pagina_${i}"><a href="#listado" onclick=cambiarPagina(${i})>${i}</a></li>
				`			
		}

		paginacion.innerHTML += `
				<li><a class="Next" id="siguiente" href="#listado" onclick=avanzarPagina()>Siguiente</a></li>
				 `

		listaResult.forEach((producto, i) => {
			listaHTML.innerHTML += ` 
				<div class="col-lg-3 col-md-4 col-sm-6">
					<div class="product-item fix mb-30">
						<div class="product-thumb">
							<!-- <a href="producto-detalle.html?idProducto=${producto.IdProducto}"> -->
								<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
							<!-- </a> -->
							<div class="product-action-link">                                                
								<a href="" onclick="detalleProductoModal(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view"> <span data-toggle="tooltip" data-placement="left" title="Ver"><i class="fa fa-search"></i></span> </a>
								<a href="" onclick="detalleProductoModal(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view"> <span data-toggle="tooltip" data-placement="left" title="Agregar al Carrito"><i class="fa fa-shopping-cart"></i></span> </a>
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
							<!-- <a href="producto-detalle.html?idProducto=${producto.IdProducto}"> -->
								<img src="assets/uploads/${producto.Imagen}" class="img-pri" alt="${producto.Imagen}">
							<!-- </a> -->
						</div>
						<div class="product-list-content">
							<h3>${producto.NombreProducto}</h3>
							<h4>${producto.NombreMarca}</h4>
							<div class="pricebox">
								<span class="regular-price">$${producto.PrecioVenta}</span>
							</div>
							<p>${producto.DescripcionProducto}</p>						
							<div class="product-list-action-link">
								<a href="" onclick="detalleProductoModal(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view"> <span data-toggle="tooltip" data-placement="top" title="Ver"><i class="fa fa-search"></i></span> </a>
								<a class="buy-btn" href="" onclick="detalleProductoModal(${producto.IdProducto})" data-toggle="modal" data-target="#quick_view" data-placement="top" title="Agregar al Carrito">Agregar al Carrito<i class="fa fa-shopping-cart"></i> </a>
							</div>
						</div>
					</div>
				</div>
			`;
	  	});

		await gestionarBotones()
	}
}

const busquedaPorNombre = async () => {
	let search = document.getElementById("search")
	window.location.href = `/index.html?search=${search.value}`
}

const busquedaPorCategoria = async (idCategoria) => {
	window.location.href = `/index.html?idCategoria=${idCategoria}`
}

const busquedaProductos = async (search) => {
	const token = localStorage.getItem('jwt-token')

	const res = await fetch(`/busquedaProductos?search=${search}`, {
	  method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	  }
	})
  
	if (!res.ok) {
	  window.location.href = "/login.html"
	  throw Error("Problemas en login")
	}
  
	const data = await res.json()
  
  
	return data
  }

const listadoCategorias = async () => {
	const token = localStorage.getItem('jwt-token')

	const res = await fetch(`/listadoCategorias/0`, {
	  method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	  }
	})
  
	if (!res.ok) {
	  window.location.href = "/login.html"
	  throw Error("Problemas en login")
	}
  
	const listaResult = await res.json()

	let listaCateHTML = document.querySelector(`#listaCategorias`)

	listaCateHTML.innerHTML = ''

	listaResult.forEach((categoria, i) => {
		listaCateHTML.innerHTML += ` 
		<li><a href="#listado" onclick="busquedaPorCategoria(${categoria.IdCategoria})"><i class=""></i>${categoria.NombreCategoria}</a></li>
		`;
	});
}

const listadoProductos = async (search, idCategoria) => {
	//let resultados  
	if (search != "" && search != null) {
	  resultados = await busquedaProductos(search)
	}
	else {
	  resultados = await buscarListado(idCategoria)
	}

	resultados = resultados.concat(resultados)
	resultados = resultados.concat(resultados)
	resultados = resultados.concat(resultados)
	resultados = resultados.concat(resultados)
	resultados.splice(29)
	cantTotalProductos = resultados.length

	await llenarGrillaProductos();
}

const buscarProducto = async (idProducto) => {
	const token = localStorage.getItem('jwt-token')
  
	const res = await fetch(`/detalleProducto/${idProducto}`, {
	  method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}` 
	  }
	})
  
	if (!res.ok) {
	  window.location.href = "/login.html"
  
	  throw Error("Problemas en login")
	}
  
	const data = await res.json()
  
	return data
}

const detalleProductoModal = async (idProducto) => {
	let imagenProducto = document.getElementById("imagenProductoModal")
	let nombreProducto = document.getElementById("nombreProductoModal")
	let codigoProducto = document.getElementById("codigoProductoModal")
	let marcaProducto = document.getElementById("marcaProductoModal")
	let stockProducto = document.getElementById("stockProductoModal")
	let precioProducto = document.getElementById("precioProductoModal")
	let descripcionProducto = document.getElementById("descripcionProductoModal")

	const lProductos = await buscarProducto(idProducto)
	const producto = lProductos[0]

	imagenProducto.src = `assets/uploads/${producto.Imagen}`
	nombreProducto.innerHTML = producto.NombreProducto
	codigoProducto.innerHTML = `Código Producto: ${producto.IdProducto}`
	marcaProducto.innerHTML = producto.NombreMarca
	stockProducto.innerHTML = `${producto.PrecioCompra} en Stock`
	precioProducto.innerHTML = `$${producto.PrecioVenta}`
	descripcionProducto.innerHTML = producto.DescripcionProducto
}

const dibujarCarrito = async (productos) => {
	let productosAgrupados = productos
}

const agregarAlCarrito = async () => {
	let imagenProducto = document.getElementById("imagenProductoModal")
	let nombreProducto = document.getElementById("nombreProductoModal")
	let codigoProducto = document.getElementById("codigoProductoModal")

	let producto = {"Id": codigoProducto.textContent, "Nombre": nombreProducto.textContent, "Imagen": imagenProducto.src}
	let productos = JSON.parse(localStorage.getItem("productos")) || []
	productos.push(producto)

	localStorage.setItem("productos", JSON.stringify(productos))

	//dibujarCarrito(productos)
}