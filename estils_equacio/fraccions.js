'use strict';

import {redimensionaAmpladaEntrada, permetMoviment} from './utils.js';
import {entrada_principal} from './estils_equacio_principal.js';
export {creaFraccio, eliminaFraccio};


// Funcio creadora de fraccions
function creaFraccio(entrada) {
    // Declarem variables
    let fd = new DocumentFragment();
    let fraccio = document.createElement('div');
    let numerador = document.createElement('div');
    let denominador = document.createElement('div');
    let entrada_numerador = document.createElement('input');
    let entrada_denominador = document.createElement('input');

    // Establim les clases de les variables
    fraccio.className = 'fraccio';
    numerador.className = 'numerador';
    denominador.className = 'denominador';
    entrada_numerador.className = 'entrada entrada-numerador';
    entrada_denominador.className = 'entrada entrada-denominador';

    // Afegim les variables al fragment de document
    numerador.appendChild(entrada_numerador);
    denominador.appendChild(entrada_denominador);
    fraccio.appendChild(numerador);
    fraccio.appendChild(denominador);
    fd.appendChild(fraccio);



    // Insereix el fragment de document al lloc correcte
    let contenidor = entrada.parentElement; // Obtenim el contenidor de l'entrada

    // Creem una entrada al davant de la fraccio i afegim la fraccio
    let nova_entrada = document.createElement('input');
    nova_entrada.className = 'entrada entrada-fraccio';
    contenidor.insertBefore(nova_entrada, entrada);
    contenidor.insertBefore(fd, entrada);

    // Si estem fora de l'entrada principal afegim una altre entrada darrera de la fraccio
    if(entrada !== entrada_principal){
        let nova_entrada2 = document.createElement('input');
        nova_entrada2.className = 'entrada entrada-fraccio';
        contenidor.insertBefore(nova_entrada2, entrada);
        contenidor.removeChild(entrada);
    }


    //Establim el valor en el numerador
    let valor_entrada = entrada.value;

    // Si no hi ha parentesis o n'hi ha pero sense text al davant o amb text al darrera
    if(valor_entrada.indexOf('(') === -1 || valor_entrada.indexOf('(') === 0 || valor_entrada.indexOf(')') !== valor_entrada.length-1) {
        
        // Si hi ha text al darrera, crea una fraccio normal sense res al denominador
        if(valor_entrada.indexOf(')') !== valor_entrada.length-1) {
            nova_entrada.value = valor_entrada;
            
        } else {
            entrada_numerador.value = valor_entrada.replace('(', '').replace(')', '');
        }
        entrada.value = ''

        // Establir el + o el - de la fraccio
        if(valor_entrada[0] === '+' || valor_entrada[0] === '-' || valor_entrada[0] === '*') {
            nova_entrada.value = valor_entrada[0];
            valor_entrada = valor_entrada.substring(1, 10000);
        } else {
            nova_entrada.value = nova_entrada.value + '+';
        }
    }

    // Si hi ha parentesis i hi ha text al davant i no n'hi ha al darrera
    if(valor_entrada.indexOf('(') !== -1 && valor_entrada.indexOf('(') !== 0 && valor_entrada.indexOf(')') === valor_entrada.length-1) {
        // Establir el + o el - de la fraccio
        if(valor_entrada[valor_entrada.indexOf('(')-1] !== '+' && valor_entrada[valor_entrada.indexOf('(')-1] !== '-' && valor_entrada[valor_entrada.indexOf('(')-1] !== '*') {
            nova_entrada.value = '*';
        }

        entrada_numerador.value = valor_entrada.substring(valor_entrada.indexOf('('), valor_entrada.length).replace('(', '').replace(')', '');
        nova_entrada.value = valor_entrada.replace(`(${entrada_numerador.value})`, '') + nova_entrada.value;
        entrada.value = ''
        redimensionaAmpladaEntrada(nova_entrada); // Redimensiona l'amplada de la nova entrada
    }

    redimensionaAmpladaEntrada(entrada_numerador); // Redimensiona l'amplada del numerador
    redimensionaAmpladaEntrada(nova_entrada); // Redimensiona l'amplada de la nova entrada
    entrada_denominador.focus();    // Posa el focus al denominador
    permetMoviment();   // Permet el moviment entre les noves entrades
}



// Elimina una fraccio donant-li l'entrada denominador o numerador
function eliminaFraccio(entrada) {
    // Agafem el div fraccio
    let fraccio = entrada.parentElement.parentElement;

    // Si nomes hi ha 3 elements al pare vol dir que ha de canviar a entrada entrada-numerador/denominador
    if(fraccio.parentElement.children.length === 3 && fraccio.parentElement.lastElementChild !== entrada_principal) {
        fraccio.parentElement.lastElementChild.className = 'entrada entrada-' + entrada.parentElement.className;
    }


    // Si anteriorment hi ha un input, afegim el contingut d'aquell input al del davant
    let div = document.createElement('div'); // Creem un div per possibles errors
    div.className = 'null';
    let entrada_seguent = fraccio.nextElementSibling || div;
    let entrada_anterior = fraccio.previousElementSibling || div;

    // Eliminem l'entrada anterior
    entrada_anterior.parentElement.removeChild(fraccio.previousElementSibling);

    // Agafem el valor de les entrades del costat i les afegim a l'entrada seguent
    entrada_seguent.value = (entrada_anterior.value || '') + fraccio.firstElementChild.firstElementChild.value + (entrada_seguent.value || '')
    entrada_seguent.focus();
    
    fraccio.parentElement.removeChild(fraccio); // Eliminem la fraccio
    redimensionaAmpladaEntrada(entrada_seguent);
    permetMoviment();   // Permet el desplaçament entre les noves entrades
}