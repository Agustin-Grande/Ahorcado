let obtener_palabra = '';
let errores = 0;
let aciertos = 0;


const palabras = [
    'ancianos',
    'sacerdotes',
    'calabaza',
    'maiz',
    'diosdelsol',
    'diosdelaluna',
    'diosdelavida',
    'diosdelamuerte',
    'diosdelmaiz',
    'pelota',
    'matematicos',
    'arquitectos',
    'tapa rabos',
    'faldas',
    'pechera',
    'hombreras',
    'mesoamerica',
    'collares'
];
const boton = document.getElementById('jugar');
const imagen = id('imagen');
const boton_letras = document.querySelectorAll("#letras button");

//Iniciar juego
boton.addEventListener('click', iniciar);

console.log(boton);

function id (str){
    return document.getElementById(str);
}

function obtener_random(min, max){
    const amplitudValores = max - min;
    const valor_azar = Math.floor(Math.random() * (amplitudValores)) + min;

    return valor_azar;

}
function iniciar(event){
    imagen.src = 'img/ahorcado0.jpg';
    errores = 0;
    aciertos = 0;
    boton.disabled = true;
    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = '';

    const cant_palabras = palabras.length;//valor mas alto
    const valor_azar = obtener_random(0, cant_palabras);
    
    obtener_palabra = palabras[valor_azar]
    console.log(obtener_palabra);
    const cant_letras = obtener_palabra.length;
    
    for(let i = 0; i < boton_letras.length; i++){
        boton_letras[i].disabled = false;
    }

    for (let i = 0; i < cant_letras; i++){

        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
}

//adivinar letras
for(let i = 0; i < boton_letras.length; i++){
    boton_letras[i].addEventListener('click', click_letras);
}

function click_letras(event){
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target; //cual boton toque
    button.disabled = true;
    const letra = button.innerHTML.toLocaleLowerCase();
    const palabra = obtener_palabra.toLocaleLowerCase(); //poner toda la palabra a misnucla
    
    let acerto = false;

    for(let i = 0; i < palabra.length; i++){
        if(letra == palabra[i]){
            // la variable i es la posicion de la letra en la palabra
            spans[i].innerHTML = letra;
            aciertos++;
            acerto = true;
        }
    }
    if (acerto == false){
        errores++;
        const vida = `img/ahorcado${errores}.png`
        const imagen = id('imagen');
        imagen.src = vida;
    }
    if(errores == 7 ){
        id('resultado').innerHTML = ("Prueba a intentarlo otra vez");
        game_over();
    }
    else if (aciertos == obtener_palabra.length) {
        id('resultado').innerHTML = ("FELICITACIONES GANASTEE!!!!!!");
        game_over();
    }
    console.log("la letra " + letra + " en la palabra " + palabra + " existe?: " +  acerto);

}

function game_over(){
    for(let i = 0; i < boton_letras.length; i++){
        boton_letras[i].disabled = true;
    }
    
    boton.disabled = false;

}

game_over();