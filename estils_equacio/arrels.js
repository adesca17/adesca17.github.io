'use strict';

import {redimensionaAmpladaEntrada, permetMoviment} from './utils.js';
export {creaArrel, eliminaArrel};


// Funció creadora d'arrels
function creaArrel(entrada) {
    // Declarem variables
    let fd = new DocumentFragment();
    let nova_entrada = document.createElement('input');
    let index = document.createElement('input');
    let radicand = document.createElement('input');
    let sub = document.createElement('sub');
    let sup = document.createElement('sup');
    let arrel = document.createElement('p')

    // Establim les clases de les variables
    index.className = 'entrada index';
    radicand.className = 'entrada radicand';
    nova_entrada.className = 'entrada';
    sup.className = 'sup-index';
    sub.className = 'sub-radicand';
    arrel.className = 'arrel';

    // Afegim les variables al fragment de document
    sup.appendChild(index);
    sub.appendChild(radicand);
    fd.appendChild(nova_entrada);
    fd.appendChild(sup);
    fd.appendChild(arrel);
    fd.appendChild(sub);

    // Afegim el símbol de l'arrel i afegim l'arrel a l'entrada
    arrel.innerText = '\u221A';
    entrada.parentElement.insertBefore(fd, entrada);

    // Esborrem sqrt
    entrada.value = entrada.value.replace('sqrt', '');

    let valor_entrada = entrada.value;
    if(valor_entrada.includes(';')) {
        radicand.value = valor_entrada.substring(valor_entrada.indexOf('('), valor_entrada.indexOf(';')).replace('(', '');
        index.value = valor_entrada.substring(valor_entrada.indexOf(';'), valor_entrada.length).replace(';', '');
    } else {
        radicand.value = valor_entrada.substring(valor_entrada.indexOf('('), valor_entrada.length).replace('(', '');
        index.value = '2';
    }
    entrada.value = valor_entrada.replace(`(${radicand.value}`, '').replace(`;${index.value}`, '');


    // En cas d'estar dins de fraccions, canviem i afegim classes CSS per qüestió d'estils
    if(entrada.parentElement.className === 'numerador' || entrada.parentElement.className === 'denominador') {
        nova_entrada.className = 'entrada entrada-fraccio';
        entrada.className = 'entrada entrada-fraccio';
        radicand.className = 'entrada radicand-fraccio';
        index.className = 'entrada index-fraccio';
        arrel.className = 'arrel-fraccio';
    }
    

    // Afegim la resta del text davant de l'arrel
    nova_entrada.value = entrada.value + '+';
    entrada.value = '';

    redimensionaAmpladaEntrada(index);
    redimensionaAmpladaEntrada(radicand);
    redimensionaAmpladaEntrada(nova_entrada);
    radicand.focus();    // Posa el focus al radicand
    permetMoviment();   // Permet el desplaçament entre les noves entrades

}


function eliminaArrel(entrada) {
    let contenidor = entrada.parentElement.parentElement;
    let sub = entrada.parentElement;

    // Si només queda un element en la fracció, canviem la classe de l'última entrada
    if(entrada.classList[1] === 'radicand-fraccio' && contenidor.children.length === 5) {
        sub.nextElementSibling.className = 'entrada entrada-' + contenidor.className;
    }

    // Fem focus a l'entrada següent de després de l'arrel
    sub.nextElementSibling.focus();

    contenidor.removeChild(sub.previousElementSibling); // Elimina l'arrel
    contenidor.removeChild(sub.previousElementSibling); // Elimina l'índex

    // Establim el valor de l'entrada següent que és el que hi ha davant de l'arrel
    sub.nextElementSibling.value = sub.previousElementSibling.value + sub.nextElementSibling.value;
    redimensionaAmpladaEntrada(sub.nextElementSibling);

    contenidor.removeChild(sub.previousElementSibling); // Elimina l'entrada anterior
    contenidor.removeChild(sub); // Elimina el radicand

    permetMoviment();

}