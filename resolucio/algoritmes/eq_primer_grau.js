'use strict';

export {eq_primer_grau};

// Aplica l'algoritme per resoldre equacions de primer grau mostrant els passos
function eq_primer_grau(eq, valor0, valor1) {

    valor0 = -valor0;

    if(valor0 < 0) {
        eq = `x = -\\frac{${-valor0}}{${valor1}} = ${Math.round((valor0/valor1)*100)/100}`;
    } else {
        eq = `x = \\frac{${valor0}}{${valor1}} = ${Math.round((valor0/valor1)*100)/100}`;
    }
    
    return eq;
    
}