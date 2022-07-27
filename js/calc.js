//solucion
//primero damos un nombre a los numros en html
//luego los pongo en un arreglo para recorrerlo y luego pueda agregar por cada recorrido su evento click
//defino 4 constantes par capturar los elementos dentro del DOm
//luego creo la raviable para capturar el resultado
const botonNumeros = document.getElementsByName('data-number');
const botonOperacion = document.getElementsByName('data-operacion');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonBorrar = document.getElementsByName('data-delete')[0];
var resultado = document.getElementById('result');
var opeActual = '';
var opeAnterior = '';
var operacion = undefined;

//agregar evento a los botones para capturarlos
//agregaremos el evento onClick por que es
//el evento click de cada boton para que llame a un metodo
//vamos a recorrer ese arreglo
botonNumeros.forEach(function (boton) {
    boton.addEventListener('click', function () {
        agregarNumero(boton.innerText);
    })
})

botonOperacion.forEach(function (boton) {
    boton.addEventListener('click', function () {
        selectOperacion(boton.innerText);
    })
});

botonIgual.addEventListener('click', function () {
    calcular();
    actualizarDisplay();
});

botonBorrar.addEventListener('click', function () {
    limpiarVisor();
    actualizarDisplay();
});

//agregar los metodos que llamaremos dentro de las fuciones

//agregarNumero
function agregarNumero(num) { // recive el texto del boton boton.innerText y lo recivmos en una variable num
    opeActual = opeActual.toString() + num.toString(); //necesitamos convertirlo a texto por que necesito concatenar lo que el usuario va colocando en el visor input text
    actualizarDisplay();
}

function actualizarDisplay() {
    resultado.value = opeActual;
}

function limpiarVisor() { // para volver a iunicializar nuestras variables
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}

limpiarVisor();

//selectOperacion
// si opeActual es igual a vacio le decimos retun para que salga, no hay un nunmero todavia en la opeActual
function selectOperacion(op) {
    if (opeActual === '') return;
    if (opeAnterior !== '') { // si es diferente de vacio vamos a calcular
        calcular();
    }
    operacion = op.toString();
    opeAnterior = opeActual; // por que vamos a tener que cambiar de operacion
    opeActual = ''; // regresa a su estado original
}

//definir metodo calcular
function calcular() {
    var calculo; // esta variable va a guardar la operacion. los valores string que tenemos los ponemos en un par de variable pero ya convertidos a numeros
    const anterior = parseFloat(opeAnterior); //como vamos a trabajar con numeros convertimos a float los valores de opeAnterior
    const actual = parseFloat(opeActual); //como vamos a trabajar con numeros convertimos a float los valores de opeActual

    if (isNaN(anterior) || isNaN(actual)) //vamos a preguntar si es numerico
        return; //si ambos cumplen esta condicion return
    switch (operacion) { // de acuerdo a la seleccion de la operacion hacemos la operacion
        case '+': //en cada caso hacer el calculo que corresponda segunla seleccion
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case '*':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';
}