
// Requisitos: nombre, correo, contraseña, validaciones específicas
function validarRegistro(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto
    
    // Obtiene los valores del formulario
    const nombre = document.getElementById('nombre').value.trim(); // Nombre completo
    const correo = document.getElementById('correo').value.trim(); // Correo electrónico
    const password = document.getElementById('password').value; // Contraseña
    const telefono = document.getElementById('telefono').value.trim(); // Teléfono opcional
    const region = document.getElementById('region').value; // Región seleccionada
    const comuna = document.getElementById('comuna').value; // Comuna seleccionada
    
    // VALIDACIÓN: Nombre completo
    if (nombre.length < 3) { // Mínimo 3 caracteres
        alert('El nombre debe tener al menos 3 caracteres'); // Mensaje de error
        return false; // Detiene la validación
    }
    
    if (nombre.length > 50) { // Máximo 50 caracteres (según requisitos)
        alert('El nombre no puede exceder 50 caracteres'); // Mensaje de error
        return false; // Detiene la validación
    }
    
    // VALIDACIÓN: Correo electrónico
    // Requisito: Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']; // Dominios válidos
    let correoValido = false; // Flag de validación
    
    // Verifica si el correo termina con algún dominio permitido
    for (let dominio of dominiosPermitidos) { // Recorre dominios
        if (correo.endsWith(dominio)) { // Si termina con el dominio
            correoValido = true; // Marca como válido
            break; // Sale del bucle
        }
    }
    
    if (!correoValido) { // Si el correo no es válido
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'); // Error
        return false; // Detiene la validación
    }
    
    if (correo.length > 100) { // Máximo 100 caracteres (según requisitos)
        alert('El correo no puede exceder 100 caracteres'); // Mensaje de error
        return false; // Detiene la validación
    }
    
    // VALIDACIÓN: Contraseña
    // Requisito: Entre 4 y 10 caracteres
    if (password.length < 4) { // Mínimo 4 caracteres
        alert('La contraseña debe tener al menos 4 caracteres'); // Error
        return false; // Detiene la validación
    }
    
    if (password.length > 10) { // Máximo 10 caracteres
        alert('La contraseña no puede exceder 10 caracteres'); // Error
        return false; // Detiene la validación
    }
    
    // VALIDACIÓN: Teléfono (opcional)
    if (telefono && !/^\d{8,9}$/.test(telefono)) { // Si hay teléfono, valida formato
        alert('El teléfono debe tener 8 o 9 dígitos'); // Error
        return false; // Detiene la validación
    }
    
    // VALIDACIÓN: Región y Comuna
    if (!region) { // Si no hay región seleccionada
        alert('Debe seleccionar una región'); // Error
        return false; // Detiene la validación
    }
    
    if (!comuna) { // Si no hay comuna seleccionada
        alert('Debe seleccionar una comuna'); // Error
        return false; // Detiene la validación
    }
    
    // Si todas las validaciones pasan, guarda el usuario
    const nuevoUsuario = { // Crea objeto usuario
        nombre: nombre, // Nombre
        correo: correo, // Correo
        password: password, // Contraseña (en producción debería encriptarse)
        telefono: telefono, // Teléfono
        region: region, // Región
        comuna: comuna, // Comuna
        fechaRegistro: new Date().toISOString() // Fecha de registro
    };
    
    // Guarda en localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtiene usuarios existentes
    usuarios.push(nuevoUsuario); // Agrega el nuevo usuario
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda en localStorage
    
    // Muestra mensaje de éxito
    alert('¡Registro exitoso!'); // Confirmación
    
    // Limpia el formulario
    document.getElementById('form-registro').reset(); // Resetea campos
    
    return false; // Previene el envío real del formulario
}

// VALIDACIÓN DE LOGIN
// Requisitos: correo y contraseña con validaciones específicas
function validarLogin(event) {
    event.preventDefault(); // Previene el envío del formulario
    
    // Obtiene los valores del formulario
    const correo = document.getElementById('login-correo').value.trim(); // Correo
    const password = document.getElementById('login-password').value; // Contraseña
    
    // VALIDACIÓN: Correo requerido
    if (!correo) { // Si está vacío
        alert('El correo es requerido'); // Error
        return false; // Detiene
    }
    
    // VALIDACIÓN: Formato de correo
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']; // Dominios válidos
    let correoValido = false; // Flag
    
    // Verifica dominio permitido
    for (let dominio of dominiosPermitidos) { // Recorre dominios
        if (correo.endsWith(dominio)) { // Si coincide
            correoValido = true; // Marca válido
            break; // Sale
        }
    }
    
    if (!correoValido) { // Si no es válido
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'); // Error
        return false; // Detiene
    }
    
    if (correo.length > 100) { // Máximo 100 caracteres
        alert('El correo no puede exceder 100 caracteres'); // Error
        return false; // Detiene
    }
    
    // VALIDACIÓN: Contraseña requerida
    if (!password) { // Si está vacía
        alert('La contraseña es requerida'); // Error
        return false; // Detiene
    }
    
    // VALIDACIÓN: Longitud de contraseña (entre 4 y 10 caracteres)
    if (password.length < 4 || password.length > 10) { // Fuera del rango
        alert('La contraseña debe tener entre 4 y 10 caracteres'); // Error
        return false; // Detiene
    }
    
    // Verifica credenciales en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtiene usuarios
    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password); // Busca usuario
    
    if (usuarioEncontrado) { // Si encuentra el usuario
        // Guarda sesión actual
        sessionStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado)); // Guarda en sesión
        alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`); // Saludo
        
        // Limpia el formulario
        document.getElementById('form-login').reset(); // Resetea campos
    } else { // Si no encuentra el usuario
        alert('Correo o contraseña incorrectos'); // Error
    }
    
    return false; // Previene envío real
}

// VALIDACIÓN DE CONTACTO
// Requisitos: nombre, correo, mensaje con validaciones específicas
function validarContacto(event) {
    event.preventDefault(); // Previene el envío del formulario
    
    // Obtiene los valores del formulario
    const nombre = document.getElementById('contacto-nombre').value.trim(); // Nombre
    const correo = document.getElementById('contacto-correo').value.trim(); // Correo
    const mensaje = document.getElementById('contacto-mensaje').value.trim(); // Mensaje
    
    // VALIDACIÓN: Nombre requerido
    if (!nombre) { // Si está vacío
        alert('El nombre es requerido'); // Error
        return false; // Detiene
    }
    
    if (nombre.length > 100) { // Máximo 100 caracteres (según requisitos)
        alert('El nombre no puede exceder 100 caracteres'); // Error
        return false; // Detiene
    }
    
    // VALIDACIÓN: Correo
    if (!correo) { // Si está vacío
        alert('El correo es requerido'); // Error
        return false; // Detiene
    }
    
    // Validación de dominios permitidos
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']; // Dominios
    let correoValido = false; // Flag
    
    // Verifica dominio
    for (let dominio of dominiosPermitidos) { // Recorre
        if (correo.endsWith(dominio)) { // Si coincide
            correoValido = true; // Válido
            break; // Sale
        }
    }
    
    if (!correoValido) { // Si no es válido
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'); // Error
        return false; // Detiene
    }
    
    if (correo.length > 100) { // Máximo 100 caracteres
        alert('El correo no puede exceder 100 caracteres'); // Error
        return false; // Detiene
    }
    
    // VALIDACIÓN: Mensaje requerido
    if (!mensaje) { // Si está vacío
        alert('El mensaje es requerido'); // Error
        return false; // Detiene
    }
    
    if (mensaje.length > 500) { // Máximo 500 caracteres (según requisitos)
        alert('El mensaje no puede exceder 500 caracteres'); // Error
        return false; // Detiene
    }
    
    // Si todas las validaciones pasan, guarda el mensaje
    const nuevoMensaje = { // Crea objeto mensaje
        nombre: nombre, // Nombre del remitente
        correo: correo, // Correo del remitente
        mensaje: mensaje, // Contenido del mensaje
        fecha: new Date().toISOString() // Fecha de envío
    };
    
    // Guarda en localStorage
    let mensajes = JSON.parse(localStorage.getItem('mensajes')) || []; // Obtiene mensajes existentes
    mensajes.push(nuevoMensaje); // Agrega el nuevo mensaje
    localStorage.setItem('mensajes', JSON.stringify(mensajes)); // Guarda en localStorage
    
    // Muestra confirmación
    alert('¡Mensaje enviado con éxito!'); // Confirmación
    
    // Limpia el formulario
    document.getElementById('form-contacto').reset(); // Resetea campos
    
    return false; // Previene envío real
}

// FUNCIÓN AUXILIAR: Validar RUT chileno
// Requisito adicional según la rúbrica
function validarRut(rut) {
    // Elimina puntos y guión
    rut = rut.replace(/\./g, '').replace(/-/g, ''); // Limpia formato
    
    // Validación de formato: 7-9 caracteres
    if (rut.length < 7 || rut.length > 9) { // Fuera del rango
        return false; // RUT inválido
    }
    
    // Separa número y dígito verificador
    const numero = rut.slice(0, -1); // Todo menos el último carácter
    const dv = rut.slice(-1).toUpperCase(); // Último carácter en mayúscula
    
    // Valida que el número sea realmente un número
    if (isNaN(numero)) { // Si no es número
        return false; // RUT inválido
    }
    
    // Calcula el dígito verificador
    let suma = 0; // Inicializa suma
    let multiplicador = 2; // Inicializa multiplicador
    
    // Recorre el número de derecha a izquierda
    for (let i = numero.length - 1; i >= 0; i--) { // Bucle inverso
        suma += parseInt(numero[i]) * multiplicador; // Suma producto
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1; // Cicla multiplicador
    }
    
    // Calcula el dígito verificador esperado
    const dvEsperado = 11 - (suma % 11); // Fórmula del DV
    let dvCalculado; // Variable para el DV calculado
    
    if (dvEsperado === 11) { // Caso especial
        dvCalculado = '0'; // DV es 0
    } else if (dvEsperado === 10) { // Caso especial
        dvCalculado = 'K'; // DV es K
    } else { // Caso normal
        dvCalculado = dvEsperado.toString(); // Convierte a string
    }
    
    // Compara con el dígito verificador proporcionado
    return dv === dvCalculado; // Retorna true si coinciden
}

// FUNCIÓN: Mostrar mensajes de error con estilo
function mostrarError(campo, mensaje) {
    // Crea elemento de error si no existe
    let errorElement = document.getElementById(`error-${campo}`); // Busca elemento de error
    
    if (!errorElement) { // Si no existe
        errorElement = document.createElement('div'); // Crea div
        errorElement.id = `error-${campo}`; // Asigna ID
        errorElement.style.color = 'red'; // Color rojo
        errorElement.style.fontSize = '0.9em'; // Tamaño pequeño
        errorElement.style.marginTop = '5px'; // Margen superior
        
        // Inserta después del campo
        const campoElement = document.getElementById(campo); // Obtiene el campo
        if (campoElement) { // Si existe el campo
            campoElement.parentNode.insertBefore(errorElement, campoElement.nextSibling); // Inserta después
        }
    }
    
    errorElement.textContent = mensaje; // Establece el mensaje de error
}

// FUNCIÓN: Limpiar mensajes de error
function limpiarErrores() {
    // Busca todos los elementos de error
    const errores = document.querySelectorAll('[id^="error-"]'); // Selecciona elementos con ID error-*
    errores.forEach(error => error.remove()); // Elimina cada uno
}