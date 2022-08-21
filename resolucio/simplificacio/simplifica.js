'use strict';

import { simplificaParentesis } from './simplifica_parentesis.js';
import { simplificaFraccions } from './simplifica_fraccions.js';
import { reduirTermes } from './reduir_termes.js';
export { simplifica };

let procediment = document.getElementById('procediment');
let valor0, valor1, valor2;

// Simplifica l'equació
function simplifica(eq) {

    // Simplifica fraccions
    if(eq.includes('frac')) {
        eq = simplificaFraccions(eq);
        procediment.innerText = procediment.innerText + `Resolem les fraccions: $$${eq}$$`;
    }

    // Simplifica multiplicacions/parèntesis
    if(eq.includes('(')) {
        eq = simplificaParentesis(eq);
        procediment.innerText = procediment.innerText + `Resolem els parentesis: $$${eq}$$`;
    }

    // Reduir termes
    [eq, valor0, valor1, valor2] = reduirTermes(eq);
    procediment.innerText = procediment.innerText + `Reduim els termes: $$${eq}$$`;

    return [eq, valor0, valor1, valor2];

}