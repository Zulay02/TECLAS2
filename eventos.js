var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var colorcito = "#1e5bd8"; // azul
var movimiento = 10;
var x;
var y;

// keydown: dibuja mientras la flecha está presionada (keyup solo dibujaba al soltarla)
document.addEventListener("keydown", dibujarTeclado);

empezar();

function empezar()
{
    papel.clearRect(0, 0, cuadrito.width, cuadrito.height);
    x = cuadrito.width / 2;
    y = cuadrito.height / 2;
    // Punto rojo de inicio
    dibujarLinea("red", x - 1, y - 1, x + 1, y + 1, papel);
}

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 5;
    lienzo.lineCap = "round"; // puntas redondeadas para que las líneas se unan bien
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

// Evita que el lápiz se salga del lienzo
function limitar(valor, maximo)
{
    if (valor < 0)
    {
        return 0;
    }
    if (valor > maximo)
    {
        return maximo;
    }
    return valor;
}

function dibujarTeclado(evento)
{
    var nuevaX = x;
    var nuevaY = y;

    switch (evento.keyCode)
    {
        case teclas.UP:
            nuevaY = y - movimiento; //arriba
            break;
        case teclas.DOWN:
            nuevaY = y + movimiento; //abajo
            break;
        case teclas.LEFT:
            nuevaX = x - movimiento; //izquierda
            break;
        case teclas.RIGHT:
            nuevaX = x + movimiento; //derecha
            break;
        default:
            console.log("otra tecla");
            return;
    }

    // Que las flechas no muevan la página hacia arriba o abajo
    evento.preventDefault();

    nuevaX = limitar(nuevaX, cuadrito.width);
    nuevaY = limitar(nuevaY, cuadrito.height);

    dibujarLinea(colorcito, x, y, nuevaX, nuevaY, papel);
    x = nuevaX;
    y = nuevaY;
}

// ---------- BOTONES DE COLOR ----------
var botonesColor = document.querySelectorAll(".color");
var nombreColor = document.getElementById("nombreColor");

for (var i = 0; i < botonesColor.length; i++)
{
    botonesColor[i].addEventListener("click", elegirColor);
}

function elegirColor(evento)
{
    var boton = evento.currentTarget;
    colorcito = boton.dataset.color;
    nombreColor.textContent = boton.dataset.nombre;

    for (var i = 0; i < botonesColor.length; i++)
    {
        botonesColor[i].classList.remove("elegido");
    }
    boton.classList.add("elegido");
    boton.blur(); // devuelve el teclado al dibujo
}

// ---------- BOTÓN BORRAR ----------
document.getElementById("borrar").addEventListener("click", function (evento)
{
    empezar();
    evento.currentTarget.blur();
});
