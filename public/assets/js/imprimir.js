let columnaEliminar = document.querySelectorAll(".pro-remove")
let presupuesto = document.getElementById("presupuesto")

const pathActual = window.location.href;

if (pathActual.includes('esPresupuesto=SI')) {
	presupuesto.innerHTML = "Presupuesto"
}

columnaEliminar.forEach((fila, i) => {
	fila.remove()
})

window.print()

localStorage.removeItem("productos")

const imprimir = async () => {
	window.print()
}