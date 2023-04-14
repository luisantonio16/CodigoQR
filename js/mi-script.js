const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');
const contenedor = document.querySelector('.contenedor');
const fondo = document.querySelector('.fondo');

//funcion sleep
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const evaluarQR = async() => {
	//generar el codigo QR con los datos del formulario para invocar la app de contactos del celular
	nombre = formulario.nombre.value;
	telefono = formulario.telefono.value;
	
	//validar que el nombre y el telefono no esten vacios
	if (nombre === '' || telefono === '') {
		alert('Por favor ingrese un nombre y un telefono');
		return;
	}

	//validar que el telefono sea un numero
	if (isNaN(telefono)) {
		alert('Por favor ingrese un numero de telefono valido');
		return;
	}

	//generar el codigo QR para agregar el contacto a la agenda del celular
	const url = `https://api.qrserver.com/v1/create-qr-code/?data=BEGIN%3AVCARD%0AVERSION%3A2.1%0AN%3A${nombre}%0ATEL%3BCELL%3A${telefono}%0AEND%3AVCARD&size=500x500&bgcolor=ffffff&color=000000&qzone=1&margin=0&format=png`;

	//mostrar los datos en el contenedorQR
	contenedorQR.innerHTML = `
	<h3>Datos del Contacto</h3>
	<p>Nombre: ${nombre}</p>
	<p>Telefono: ${telefono}</p>
	<br>
	<br>
	<p>Escanea el codigo QR para agregar el contacto a tu celular</p>
	<img src="${url}" alt="QR">
	<br>
	<br>
	<!-- boton para forzar la descarga de la imagen del codigo QR en otra pestaña -->
	<button class="btn descarga" onclick="descargarImg('${url}', '${nombre}')">
	Descargar Codigo QR
	<i class="bi bi-cloud-arrow-down-fill"></i>
	</button>
	`;

	//animacion para mostrar el codigo QR
	for (let i = 0; i < 80; i++) {
		contenedor.style.minHeight = `${i}vh`;
		await sleep(10);
	}
	contenedorQR.classList.remove('oculto');
	contenedorQR.classList.add('visible');
};

const descargarImg = (url, nombre) => {
	fetch(url)
	.then(res => res.blob())
	.then(blob => {
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
		a.download = nombre;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	})
	.catch(() => alert('Hubo un error al descargar la imagen'));
};

	

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	evaluarQR();
});

formulario.nombre.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		evaluarQR();
	}
});

formulario.telefono.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		evaluarQR();
	}
});

document.body.addEventListener("mousemove", e => {
    document.querySelector(".fondo").style.backgroundImage = `
    radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
		transparent 0,
        rgba(0,0,0,.8) 20%
		),
		url("./img/fondo.jpg")`;
});

document.body.addEventListener("mouseleave", e => {
	document.querySelector(".fondo").style.backgroundImage = `
	radial-gradient(circle at 50% 50%,
		transparent 0,
        rgba(0,0,0,.8) 20%
		),
		url("./img/fondo.jpg")
	`;
});