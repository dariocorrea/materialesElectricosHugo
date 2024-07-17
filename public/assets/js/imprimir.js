let columnaEliminar = document.querySelectorAll(".pro-remove")

columnaEliminar.forEach((fila, i) => {
	fila.remove()
})

window.print()

localStorage.removeItem("productos")

const imprimir = async () => {
	window.print()
}