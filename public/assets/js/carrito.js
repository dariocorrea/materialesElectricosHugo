const llenarCarrito = async () => {
	let productos = JSON.parse(localStorage.getItem("productos")) || []
	
	let listaCarritoHTML = document.querySelector(`#bodyCarrito`)
	let totalCarrito = document.getElementById("totalCarrito")
	let total = 0
	
	listaCarritoHTML.innerHTML = ''
	
	productos.forEach((producto, i) => {
		let subtotal = producto.Cantidad * producto.Precio
		total += producto.Cantidad * producto.Precio
		
		listaCarritoHTML.innerHTML += ` 
			<tr>
				<td class="pro-thumbnail">
					<img class="img-fluid" src="assets/uploads/${producto.Imagen}" alt="${producto.Imagen}"/>
				</td>
				<td class="pro-title">${producto.Nombre}</td>
				<td class="pro-price"><span>$${producto.Precio}</span></td>
				<td class="pro-quantity">
					<div class="pro-qty"><input type="text" id="cantidadCarrito" value="${producto.Cantidad}" idprod="${producto.Id}"></div>
					<span hidden id="stockDisponible">${producto.Stock}</span>
				</td>
				<td class="pro-subtotal"><span>$${subtotal.toFixed(2)}</span></td>
				<td class="pro-remove"><a href="carrito.html" onclick=eliminarProductoDeCarrito(${producto.Id})><i class="fa fa-trash-o"></i></a></td>
			</tr>
		`
	})
	totalCarrito.innerHTML = `$${total.toFixed(2)}`
}

const eliminarProductoDeCarrito = async (idProducto) => {
	eliminarProductoCarrito(idProducto)
	//llenarCarrito()
}

const actualizarCarrito = async () => {
	let productos = JSON.parse(localStorage.getItem("productos")) || []
	const prodEnCarrito = document.querySelectorAll("#cantidadCarrito")

	prodEnCarrito.forEach((producto, i) => {
		const idProd = parseInt(producto.getAttribute("idprod"))
		const cantidad = parseInt(producto.value)

		let prodExiste = productos.find(p => p.Id == idProd)
		if (prodExiste) {
			productos = productos.filter(p => p.Id != idProd)
			prodExiste.Cantidad = cantidad

			productos.push(prodExiste)
		}
	})

	localStorage.setItem("productos", JSON.stringify(productos))

	dibujarCarrito(productos)
	//llenarCarrito()
}

const actualizarStock = async (productos) => {
	const token = localStorage.getItem('jwt-token')

	productos.forEach((producto, i) => {
		
		const idProducto = producto.Id
	    const stockNuevo = producto.Stock - producto.Cantidad

		const body = JSON.stringify({
			idProducto,
			stockNuevo
		  });
	
		const res = fetch(`/actualizarStock?_metodo=PUT`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: body
		})
	})

}

const imprimirCarrito = async (e) => {	
	const esPresupuesto = document.querySelector('input[name="presupuesto"]:checked')

	if (!esPresupuesto){
		e.preventDefault()
		alert("Seleccione si es presupuesto")
	}
	else {
		e.target.href = `imprimir.html?esPresupuesto=${esPresupuesto.value}`
		if (esPresupuesto.value == "NO") {
			let productos = JSON.parse(localStorage.getItem("productos")) || []
			//Actualizar stock solo si no es presupuesto
			actualizarStock(productos)
		}
	}
}

//document.getElementById("imprimir").addEventListener("click", imprimirCarrito);

llenarCarrito()