'use strict';

import { eliminaFraccio } from './fraccions.js';
import { eliminaArrel } from './arrels.js';
import { eliminaPotencia } from './potencies.js';
export { redimensionaAmpladaEntrada, permetMoviment, eliminaEntradaAnterior }

let contenidor_equacio = document.getElementById('contenidor-equacio');

// Funcions extres
// Redimensionar l'amplada del camp de text
function redimensionaAmpladaEntrada(entrada) { 
    let canvas = redimensionaAmpladaEntrada.canvas || (redimensionaAmpladaEntrada.canvas = document.createElement('canvas'));
    let context = canvas.getContext('2d');
    context.font = '14px Noto Sans Math';
    context.textAlign = 'center';
    let amplada = context.measureText(entrada.value).width;
    entrada.style.width = `${amplada/entrada.value.length + amplada}px`;
};


// Permet el desplaçament entre entrades
function permetMoviment(){
    let entrades = contenidor_equacio.getElementsByClassName('entrada');
    for (let i = 0; i < entrades.length; i++) {
        const entrada = entrades[i];
        entrada.addEventListener('keydown', e => {

            // Moviment amb les fletxes
            if((e.key === 'ArrowRight' && entrada.selectionStart === entrada.value.length) || e.key === 'ArrowDown'){
                e.preventDefault();
                try {
                    entrades[i+1].focus();
                } catch(e) {
                    console.log('No hi ha més entrades de text')
                }
            }

            if((e.key === 'ArrowLeft' && entrada.selectionStart === 0) || e.key === 'ArrowUp'){
                e.preventDefault();
                try {
                    entrades[i-1].focus();
                } catch(e) {
                    console.log('No hi ha més entrades de text')
                }
            }
        
        });
    }
}

// Elimina l'element 
function eliminaEntradaAnterior(entrada) {   
    let element_anterior = entrada.previousElementSibling;
    
    // S'elimina la fracció que hi ha al davant de l'element
    if(element_anterior.className === 'fraccio') {
        eliminaFraccio(element_anterior.lastElementChild.lastElementChild);
    }
    
    // S'elimina l'arrel que hi ha al davant de l'element
    if(element_anterior.lastElementChild.classList[1] === 'radicand' || element_anterior.lastElementChild.classList[1] === 'radicand-fraccio') {
        eliminaArrel(element_anterior.lastElementChild);
    }

    // S'elimina la potència que hi ha al davant de l'element
    if(element_anterior.lastElementChild.classList[1] === 'exponent' || element_anterior.lastElementChild.classList[1] === 'exponent-fraccio') {
        eliminaPotencia(element_anterior.previousElementSibling);
    }
}