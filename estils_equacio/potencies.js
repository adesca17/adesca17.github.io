'use strict';

import { redimensionaAmpladaEntrada, permetMoviment } from './utils.js';
export { creaPotencia, eliminaPotencia };


// Funció creadora d'arrels
function creaPotencia(entrada) {

    // S'esborra l'elevat
    entrada.value = entrada.value.replaceAll('e', '');    

    // Es declaren les variables
    let fd = new DocumentFragment();
    let nova_entrada = document.createElement('input');
    let exponent = document.createElement('input');
    let base = document.createElement('input');
    let sup = document.createElement('sup');

    // S'estableixen les classes CSS de les variables
    nova_entrada.className = 'entrada';
    exponent.className = 'entrada exponent';
    base.className = 'entrada base';
    sup.className = 'sup-exponent';

    // En cas d'estar dins de fraccions, es canvia i s'afegeixen classes CSS per qüestió d'estils
    if(entrada.parentElement.className === 'numerador' || entrada.parentElement.className === 'denominador') {
        base.className = 'entrada base-fraccio';
        exponent.className = 'entrada exponent-fraccio';
    }

    // S'afegeixen les variables al fragment de document i aquest al pare de l'entrada actual
    sup.appendChild(exponent);
    fd.appendChild(nova_entrada)
    fd.appendChild(base);
    fd.appendChild(sup);
    entrada.parentElement.insertBefore(fd, entrada);

    // S'afegeix la resta del text davant de l'arrel
    nova_entrada.value = entrada.value + '+';
    entrada.value = '';

    redimensionaAmpladaEntrada(exponent);
    redimensionaAmpladaEntrada(base);
    redimensionaAmpladaEntrada(nova_entrada);
    base.focus();    // Posa el focus al radicand
    permetMoviment();   // Permet el desplaçament entre les noves entrades

}


function eliminaPotencia(entrada) {
    let contenidor = entrada.parentElement;

    // Si només queda un element en la fracció, es canvia la classe de l'última entrada
    if(entrada.classList[1] === 'base-fraccio' && contenidor.children.length === 4) {
        sub.nextElementSibling.className = 'entrada entrada-' + contenidor.className;
    }

    // Es fa focus a l'entrada següent de després de l'exponent
    entrada.nextElementSibling.nextElementSibling.focus();

    contenidor.removeChild(entrada.nextElementSibling); // Elimina l'exponent

    // Estableix el valor de l'entrada següent que és el que hi ha davant de la base
    entrada.nextElementSibling.value = entrada.previousElementSibling.value + entrada.nextElementSibling.value;
    redimensionaAmpladaEntrada(entrada.nextElementSibling);

    contenidor.removeChild(entrada.previousElementSibling); // Elimina l'entrada anterior
    contenidor.removeChild(entrada); // Elimina el radicand

    permetMoviment(); // Permet el moviment entre les noves entrades
}

