'use strict';

import {redimensionaAmpladaEntrada} from './utils.js'
import {creaFraccio, eliminaFraccio, eliminaEntradaFraccio} from './fraccions.js'
export {entrada_principal}


let entrada_principal = document.getElementById('entrada-principal');
let contenidor_equacio = document.getElementById('contenidor-equacio');

//--------------------------------------- PRINCIPAL ---------------------------------------
contenidor_equacio.addEventListener('keydown', e => {
    let entrada = document.activeElement;

    // Crea una fraccio
    if(e.key === '/'){
        e.preventDefault(); // Evitem fer el que faria l'event per defecte, es a dir, escriure '/'
        creaFraccio(entrada);
    }


    //TODO: Elaborar mes
    // Crea una arrel
    if(e.key === ')' && entrada.value.includes('sqrt(')) {
        entrada.value = entrada.value.replace('sqrt', '\u221A')
        return
    }

    // Crea el simbol +-
    if(e.key === '-' && e.key === '-' && entrada.value[entrada.value.length-1] === '+') {
        e.preventDefault();
        entrada.value = entrada.value.substring(0, entrada.value.length-1) + '\u00B1';
    }

    // Esborra
    if(e.key === 'Backspace' && entrada.selectionStart === 0) {
        e.preventDefault();

        let classe = entrada.classList[1] || entrada.id // Obtenim la classe mes concreta
        // Si es una fraccio, esborra-la
        if(classe === 'entrada-numerador' || classe === 'entrada-denominador') {
            eliminaFraccio(entrada);
        }

        if(classe === 'entrada-fraccio' || classe === 'entrada-principal') {
            eliminaEntradaFraccio(entrada);
            
        }

        //TODO: el backspace a l'entrada principal ha de portar a l'ultima entrada
        if(entrada === entrada_principal) {

        }

    }

    redimensionaAmpladaEntrada(entrada);
    
});












//! MATHJAX

/*
? IDEA: ARRELS I ELEVATS
!ARRELS:

    MAIN_INPUT
    --> Primer evaluar si input.lastIndexOf('sqrt(') == 0
        --> Sí: Crear 2 inputs davant de l'actual
            --> índex (amb etiquetes sup) - només si input.value.includes(',i') i la i no és 2
            --> radicand
            --> Borrar valor de l'actual
        --> No: Crear 3 inputs davant de l'actual
            --> input amb info abans de sqrt
            --> índex (amb etiquetes sup) - només si input.value.includes(',i') i la i no és 2
            --> radicand
            --> Borrar l'actual

*/