
// ARRAY DE PRODUCTOS: Lista de productos disponibles
const productos = [
    { // Producto 1
        id: 1, // Identificador único
        nombre: "Figura Personalizada 5 a 10cm", // Nombre del producto
        precio: 15000, // Precio en pesos chilenos
        imagen: "https://via.placeholder.com/250x200", // URL de la imagen
        categoria: "pequeña", // Categoría del producto
    },
    { // Producto 2
        id: 2, // Identificador único
        nombre: "Figura Personalizada 10 a 15cm", // Nombre del producto
        precio: 22000, // Precio en pesos chilenos
        imagen: "https://via.placeholder.com/250x200", // URL de la imagen
        categoria: "mediana", // Categoría del producto
    },
    { // Producto 3
        id: 3, // Identificador único
        nombre: "Figura Personalizada 15 a 20cm", // Nombre del producto
        precio: 33000, // Precio en pesos chilenos
        imagen: "https://via.placeholder.com/250x200", // URL de la imagen
        categoria: "grande", // Categoría del producto
    },
];

// CARRITO DE COMPRAS: Array para almacenar productos en el carrito
let carrito = []; // Inicializa vacío

// FUNCIÓN: Cargar carrito desde localStorage al iniciar
function cargarCarritoDesdeStorage() {
    // Obtiene el carrito guardado en localStorage
    const carritoGuardado = localStorage.getItem('carrito'); // Busca en localStorage
    if (carritoGuardado) { // Si existe un carrito guardado
        carrito = JSON.parse(carritoGuardado); // Convierte de JSON a array
        actualizarContadorCarrito(); // Actualiza el contador visual
    }
}

// FUNCIÓN: Guardar carrito en localStorage
function guardarCarritoEnStorage() {
    // Convierte el carrito a JSON y lo guarda
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda en localStorage
}

// FUNCIÓN: Mostrar productos en la página
function mostrarProductos() {
    // Obtiene el contenedor de productos
    const contenedor = document.getElementById('lista-productos'); // Busca el elemento
    contenedor.innerHTML = ''; // Limpia el contenedor
    
    // Recorre cada producto y crea su HTML
    productos.forEach(producto => { // Por cada producto en el array
        // Crea el HTML de la tarjeta del producto
        const productoHTML = `
            <div class="producto-card"> <!-- Tarjeta del producto -->
                <img src="${producto.imagen}" alt="${producto.nombre}"> <!-- Imagen -->
                <h3>${producto.nombre}</h3> <!-- Nombre del producto -->
                <p>Precio: $${producto.precio.toLocaleString('es-CL')}</p> <!-- Precio formateado -->
                <p>Categoría: ${producto.categoria}</p> <!-- Categoría -->
                <button class="btn-principal" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito <!-- Botón para agregar -->
                </button>
            </div>
        `;
        contenedor.innerHTML += productoHTML; // Agrega el HTML al contenedor
    });
}

// FUNCIÓN: Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    // Busca el producto por su ID
    const producto = productos.find(p => p.id === idProducto); // Encuentra el producto
    
    if (!producto) { // Si no encuentra el producto
        alert('Producto no encontrado'); // Muestra alerta
        return; // Sale de la función
    }
    
    
    // Verifica si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === idProducto); // Busca en el carrito
    
    if (itemExistente) { // Si ya existe
        itemExistente.cantidad++; // Aumenta la cantidad
    } else { // Si no existe
        // Agrega nuevo item al carrito
        carrito.push({ // Agrega al array
            id: producto.id, // ID del producto
            nombre: producto.nombre, // Nombre
            precio: producto.precio, // Precio
            cantidad: 1 // Cantidad inicial
        });
    }
    
    // Actualiza el stock del producto
    producto.stock--; // Reduce el stock
    
    // Guarda el carrito en localStorage
    guardarCarritoEnStorage(); // Llama a función de guardado
    
    // Actualiza el contador visual
    actualizarContadorCarrito(); // Actualiza el número en el botón
    
    // Muestra mensaje de confirmación
    alert('Producto agregado al carrito'); // Mensaje al usuario
}

// FUNCIÓN: Actualizar contador del carrito
function actualizarContadorCarrito() {
    // Calcula el total de items en el carrito
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0); // Suma cantidades
    
    // Actualiza el elemento HTML
    document.getElementById('contador-carrito').textContent = totalItems; // Muestra el total
}

// FUNCIÓN: Abrir modal del carrito
function abrirCarrito() {
    // Muestra el modal
    document.getElementById('modal-carrito').style.display = 'block'; // Hace visible el modal
    
    // Renderiza los items del carrito
    renderizarCarrito(); // Llama a función de renderizado
}

// FUNCIÓN: Cerrar modal del carrito
function cerrarCarrito() {
    // Oculta el modal
    document.getElementById('modal-carrito').style.display = 'none'; // Oculta el modal
}

// FUNCIÓN: Renderizar items del carrito
function renderizarCarrito() {
    // Obtiene el contenedor de items
    const contenedor = document.getElementById('items-carrito'); // Busca el elemento
    
    if (carrito.length === 0) { // Si el carrito está vacío
        contenedor.innerHTML = '<p>El carrito está vacío</p>'; // Mensaje de carrito vacío
        document.getElementById('total-carrito').textContent = 'Total: $0'; // Total en 0
        return; // Sale de la función
    }
    
    // Limpia el contenedor
    contenedor.innerHTML = ''; // Vacía el contenedor
    
    let total = 0; // Inicializa el total
    
    // Recorre cada item del carrito
    carrito.forEach((item, index) => { // Por cada item
        // Crea el HTML del item
        const itemHTML = `
            <div class="item-carrito"> <!-- Item del carrito -->
                <span>${item.nombre} x${item.cantidad}</span> <!-- Nombre y cantidad -->
                <span>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</span> <!-- Subtotal -->
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button> <!-- Botón eliminar -->
            </div>
        `;
        contenedor.innerHTML += itemHTML; // Agrega al contenedor
        total += item.precio * item.cantidad; // Suma al total
    });
    
    // Actualiza el total
    document.getElementById('total-carrito').textContent = `Total: $${total.toLocaleString('es-CL')}`; // Muestra total
}

// FUNCIÓN: Eliminar item del carrito
function eliminarDelCarrito(index) {
    // Obtiene el item a eliminar
    const item = carrito[index]; // Item en la posición index
    
    // Restaura el stock del producto
    const producto = productos.find(p => p.id === item.id); // Busca el producto original
    if (producto) { // Si encuentra el producto
        producto.stock += item.cantidad; // Restaura el stock
    }
    
    // Elimina el item del carrito
    carrito.splice(index, 1); // Elimina del array
    
    // Guarda cambios
    guardarCarritoEnStorage(); // Guarda en localStorage
    actualizarContadorCarrito(); // Actualiza contador
    renderizarCarrito(); // Re-renderiza el carrito
}

// FUNCIÓN: Realizar compra
function realizarCompra() {
    if (carrito.length === 0) { // Si el carrito está vacío
        alert('El carrito está vacío'); // Muestra alerta
        return; // Sale de la función
    }
    
    // Simula el proceso de compra
    alert('¡Compra realizada con éxito!'); // Mensaje de éxito
    
    // Limpia el carrito
    carrito = []; // Vacía el array
    guardarCarritoEnStorage(); // Guarda carrito vacío
    actualizarContadorCarrito(); // Actualiza contador a 0
    cerrarCarrito(); // Cierra el modal
}

// DATOS DE REGIONES Y COMUNAS DE CHILE
const regionesYComunas = {
    "Metropolitana": ["Santiago", "Providencia", "Las Condes", "Vitacura", "La Florida"], // Región Metropolitana
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"], // Región de Valparaíso
    "Biobío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"], // Región del Biobío
    "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"] // Región de la Araucanía
};

// FUNCIÓN: Cargar regiones en el select
function cargarRegiones() {
    const selectRegion = document.getElementById('region'); // Obtiene el select de región
    
    if (!selectRegion) return; // Si no existe, sale de la función
    
    // Agrega las opciones de región
    for (let region in regionesYComunas) { // Por cada región
        const option = document.createElement('option'); // Crea elemento option
        option.value = region; // Valor de la opción
        option.textContent = region; // Texto visible
        selectRegion.appendChild(option); // Agrega al select
    }
}

// FUNCIÓN: Actualizar comunas según la región seleccionada
function actualizarComunas() {
    const selectRegion = document.getElementById('region'); // Select de región
    const selectComuna = document.getElementById('comuna'); // Select de comuna
    
    if (!selectRegion || !selectComuna) return; // Si no existen, sale
    
    const regionSeleccionada = selectRegion.value; // Obtiene región seleccionada
    
    // Limpia las comunas actuales
    selectComuna.innerHTML = '<option value="">Seleccione comuna</option>'; // Resetea opciones
    
    if (regionSeleccionada && regionesYComunas[regionSeleccionada]) { // Si hay región válida
        // Agrega las comunas de la región seleccionada
        regionesYComunas[regionSeleccionada].forEach(comuna => { // Por cada comuna
            const option = document.createElement('option'); // Crea option
            option.value = comuna; // Valor
            option.textContent = comuna; // Texto
            selectComuna.appendChild(option); // Agrega al select
        });
    }
}

// EVENTO: Cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa la aplicación
    cargarCarritoDesdeStorage(); // Carga el carrito guardado
    mostrarProductos(); // Muestra los productos
    cargarRegiones(); // Carga las regiones
    
    // Cierra el modal si se hace clic fuera de él
    window.onclick = function(event) { // Evento click en la ventana
        const modal = document.getElementById('modal-carrito'); // Obtiene el modal
        if (event.target == modal) { // Si se clickeó el fondo del modal
            modal.style.display = 'none'; // Cierra el modal
        }
    }
});