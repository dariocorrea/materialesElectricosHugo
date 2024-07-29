const registracion = async () => {
  const nombreUsuario = document.querySelector(`[name='usuario']`).value
  const password = document.querySelector(`[name='password']`).value
  const nombrecompleto = document.querySelector(`[name='nombrecompleto']`).value
  const email = document.querySelector(`[name='email']`).value
  const idRol = document.querySelector(`[name='idRol']`).value

  const resp = await fetch(`/login/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario, password, nombrecompleto, email, idRol })
  });

  if (resp.status === 404) {
    alert("Ya existe usuario ⚠️")

  } else {
    window.location.href = "/login.html"
  }
}

const login = async () => {
  const nombreUsuario = document.querySelector(`[name='usuario']`).value
  const password = document.querySelector(`[name='password']`).value

  const resp = await fetch(`/login/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombreUsuario, password })
  });

  if (resp.status === 404) {
    alert("Usuario no válido ⚠️")
  } else if (resp.status === 401) {
    alert("Password incorrecto ⚠️")
  } else {
    const data = await resp.json()

    localStorage.setItem("jwt-token", data.token)
    localStorage.setItem("idRol", data.idRol)
    localStorage.setItem("usuario", nombreUsuario)
    window.location.href = "/index.html"
  }
}
