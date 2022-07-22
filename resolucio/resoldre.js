
import { eq_primer_grau } from './algoritmes/eq_primer_grau.js';
import { simplifica } from './simplificacio/simplifica.js';
import { transcriureEquacio } from './transcripcio.js';
import { aplicaFormat } from './format.js';


let procediment = document.getElementById('procediment');

let solucio, valor0, valor1;
// El programa comenca a resoldre en el moment de fer click al boto
document.getElementById('calcula').addEventListener('click', e => {
     

    // Obtenim l'equacio transcrita
    let eq = transcriureEquacio();
    procediment.innerText = `Partim de l'equació: $$${eq}$$`;  // Afegim el text



    // Movem els termes a la dreta i apliquem un format determinat
    eq = aplicaFormat(eq);
    procediment.innerText = procediment.innerText + `Movem els termes cap a l'esquerra: $$${eq}$$`;



    // Simplifiquem l'equacio
    let [eq_simplificada, valor0, valor1] = simplifica(eq);




    // Apliquem algoritme adequat
    solucio = eq_primer_grau(eq_simplificada, valor0, valor1);
    procediment.innerText = procediment.innerText + `Aïllem la x: $$${solucio}$$`;
    console.log(eq)   


    // Fem que MathJax li doni format al text
    MathJax.typeset([procediment]);

});