'use strict';

import { simplificaParentesis } from './simplifica_parentesis.js';
import { simplificaFraccions } from './simplifica_fraccions.js';
import { reduirTermes } from './reduir_termes.js';
import { eq_primer_grau } from '../algoritmes/eq_primer_grau.js';
export { simplifica };


let procediment = document.getElementById('procediment');
let valor0, valor1;

// Simplifica l'equacio
function simplifica(eq) {

    // Simplifica fraccions
    console.log(eq);
    if(eq.includes('frac')) {
        eq = simplificaFraccions(eq);
        procediment.innerText = procediment.innerText + `Resolem les fraccions: $$${eq}$$`;
    }
    console.log(eq);



    //TODO: Simplifica arrels





    // Simplifica mulitplicacions/parentesis
    if(eq.includes('(')) {
        eq = simplificaParentesis(eq);
        procediment.innerText = procediment.innerText + `Resolem els parentesis: $$${eq}$$`;
    }
    console.log(eq);



    // Reduir termes
    [eq, valor0, valor1] = reduirTermes(eq);
    procediment.innerText = procediment.innerText + `Reduim els termes: $$${eq}$$`;
    console.log(eq);



    return [eq, valor0, valor1];
    
}