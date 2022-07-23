'use strict';

import { eq_primer_grau } from './algoritmes/eq_primer_grau.js';
import { eq_segon_grau } from './algoritmes/eq_segon_grau.js';
import { simplifica } from './simplificacio/simplifica.js';
import { transcriureEquacio } from './transcripcio.js';
import { aplicaFormat } from './format.js';


let procediment = document.getElementById('procediment');

let solucio;
// El programa comenca a resoldre en el moment de fer click al boto
document.getElementById('calcula').addEventListener('click', e => {
     

    // Obtenim l'equacio transcrita
    let eq = transcriureEquacio();
    procediment.innerText = `Partim de l'equació: $$${eq}$$`;  // Afegim el text



    // Movem els termes a la dreta i apliquem un format determinat
    eq = aplicaFormat(eq);
    procediment.innerText = procediment.innerText + `Movem els termes cap a l'esquerra: $$${eq}$$`;



    // Simplifiquem l'equacio
    let [eq_simplificada, valor0, valor1, valor2] = simplifica(eq);




    // Apliquem algoritme adequat
    if(valor2 === '') {
        solucio = eq_primer_grau(eq_simplificada, valor0, valor1);
        procediment.innerText = procediment.innerText + `Aïllem la x: $$${solucio}$$`;
    } else {
        solucio = eq_segon_grau(eq_simplificada, valor0, valor1, valor2);
        procediment.innerText = procediment.innerText + `Apliquem la fórmula ` 
        + `de les equacions de segon grau: $$${solucio}$$`;
    }
    console.log(eq)


    // Fem que MathJax li doni format al text
    MathJax.typeset([procediment]);

});