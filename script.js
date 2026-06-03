const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalPrecio = document.getElementById("totalPrecio");

const productos = [];
const carritoProductos = {};

document.addEventListener("DOMContentLoaded", renderProductos);

const mause = new Producto("Mause", 20, 5);
const teclado = new Producto("Teclado", 10, 3);
const monitor = new Producto("Monitor", 100, 1);
const usb = new Producto("USB", 3, 10);

productos.push(mause, teclado, monitor, usb);

let totalProductos = 0;

function renderProductos() {
    listaProductos.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const elementoLi = document.createElement("li");

        elementoLi.innerHTML = `
    <span>${productos[i].nombre}</span>
    <span>S/. ${productos[i].precio}</span>
    <span>Stock: ${productos[i].stock}</span>
    <button class="btnAñadir">Añadir</button>
`;

        const btnAñadir = elementoLi.querySelector(".btnAñadir");

        btnAñadir.addEventListener("click", () => {
            añadirCarrito(productos[i]);
        });
        listaProductos.appendChild(elementoLi);
    }
}

function renderCarrito() {
    listaCarrito.innerHTML = "";

    // Mostrar resultados
    for (let nombre in carritoProductos) {
        const item = carritoProductos[nombre];

        const elementoLi = document.createElement("li");

        elementoLi.innerHTML = `
            <span>${item.producto.nombre}</span>
            <span>S/. ${item.producto.precio}</span>
            <span>x${item.cantidad}</span>
            <button class="btnQuitar">-</button>
        `;

        listaCarrito.appendChild(elementoLi);

        const btnQuitar = elementoLi.querySelector(".btnQuitar");

        btnQuitar.addEventListener("click", () => {
            eliminarCarrito(item.producto);
        });
    }

    //colocamos total
    if (totalProductos == 0){
        totalPrecio.textContent = "";
    } else {
        totalPrecio.innerHTML = `Total:  <span> S/.${totalProductos}</span>`;
    }
    

}


function añadirCarrito(productoAñadido) {

    if (productoAñadido.stock <= 0) {
        return;
    }

    if (carritoProductos[productoAñadido.nombre]) {
        carritoProductos[productoAñadido.nombre].cantidad++;
    } else {
        carritoProductos[productoAñadido.nombre] = {
            producto: productoAñadido,
            cantidad: 1
        };
    }

    productoAñadido.stock = productoAñadido.stock - 1;
    if (productoAñadido.stock === 0) {
        eliminarLi(productos, productoAñadido);
    }
    //calcular total
    totalProductos += productoAñadido.precio;

    renderProductos();
    renderCarrito();
}

function eliminarCarrito(item) {

    carritoProductos[item.nombre].cantidad--;
    item.stock++;

    if (!productos.includes(item)) {
        productos.push(item);
    }

    if (carritoProductos[item.nombre].cantidad === 0) {
        delete carritoProductos[item.nombre];
    }

    //calculamos total y si es el ultimo, se quita el texto
    totalProductos -= item.precio;

    
 
    renderProductos();
    renderCarrito();
}

function eliminarLi(arreglo, elemento) {
    const indice = arreglo.indexOf(elemento);

    if (indice !== -1) {
        arreglo.splice(indice, 1);
    }
}
