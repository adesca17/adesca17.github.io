'use strict';

import { redimensionaAmpladaEntrada, eliminaEntradaAnterior } from './utils.js';
import { creaFraccio, eliminaFraccio } from './fraccions.js';
import { creaArrel, eliminaArrel } from './arrels.js';
import { creaPotencia, eliminaPotencia } from './potencies.js';
export { entrada_principal };


let entrada_principal = document.getElementById('entrada-principal');
let contenidor_equacio = document.getElementById('contenidor-equacio');

contenidor_equacio.addEventListener('beforeinput', e => {
    let entrada = document.activeElement;
    redimensionaAmpladaEntrada(entrada);

    // Crea una fracció
    if(e.data === '/'){
        e.preventDefault(); // S'evita fer el que faria l'esdeveniment per defecte, és a dir, escriure '/'
        creaFraccio(entrada);
    }

    // Crea una arrel
    if(e.data === ')' && entrada.value.includes('sqrt(')) {
        e.preventDefault();
        creaArrel(entrada);
    }

    // Crea potències
    if(e.data === '^') {
        e.preventDefault();
        creaPotencia(entrada);
    }


    // Crea el simbol +-
    if(e.data === '-' && e.data === '-' && entrada.value[entrada.value.length-1] === '+') {
        e.preventDefault();
        entrada.value = entrada.value.substring(0, entrada.value.length-1) + '\u00B1';
    }


    // Esborra
    if(e.data === null && entrada.selectionStart === 0) {
        e.preventDefault();

        let classe = entrada.classList[1] || entrada.id // S'obté la classe més concreta
        
        // Si és una fracció, esborra-la
        if(classe === 'entrada-numerador' || classe === 'entrada-denominador') {
            eliminaFraccio(entrada);
        }

        // Si és una arrel, esborra-la
        if(classe === 'radicand' || classe === 'radicand-fraccio') {
            eliminaArrel(entrada);
        }

        // Si és una potència, esborra-la
        if(classe === 'base' || classe === 'base-fraccio') {
            eliminaPotencia(entrada);
        }

        // Elimina l'entrada anterior si és el cas
        if(classe === 'entrada-fraccio' || classe === 'entrada-principal') {
            try {
                eliminaEntradaAnterior(entrada);
            } catch (e) {
                console.log('No hi ha entrades anteriors.')
            }
        }

    }
    redimensionaAmpladaEntrada(entrada);
});