'use strict';

export { simplificaFraccions };

let simbols = ['+', '-'];

function simplificaFraccions(eq) {

    // Separem tots els elements
    console.log('----------------------------');
    eq = eq.replaceAll('(', ' (').replaceAll(')', ') ').replace('=0', '');
    eq = eq.split(' ');
    for (let i = 0; i < eq.length; i++) {
        if(!eq[i].includes('(')) eq[i] = eq[i].replaceAll('+', ' +').replaceAll('-', ' -');
    }
    eq = eq.toString().replaceAll(',', ''); // Convertim l'equacio a cadena de text

    // Extraiem totes les fraccions
    let fraccions = [];
    for (let i = 0; i < eq.length; i++) {
        let numerador = '', denominador = '', simbol = '';
        if(eq[i]==='\\' && eq[i+1] === 'f' && eq[i+2] === 'r') {
            simbol = eq[i-1];

            numerador = eq.substring(i+6, eq.indexOf('}'));
            eq = eq.replace(`+\\frac{${numerador}}`, '').replace(`-\\frac{${numerador}}`, '');

            denominador = eq.substring(i, eq.indexOf('}'));
            eq = eq.replace(`{${denominador}}`, '');
            
            fraccions.push({'numerador':`(${numerador})`, 'denominador':`(${denominador})`, 'simbol':simbol})
        }
    }

    // Afegim espais i creem un array on separem per aquests
    eq = eq.split(' ');

    // Eliminem els possibles espais buits
    eq = eq.filter((elem) => elem !== '');
    
    // Posem parentesis a cada element de l'equacio si no en tenen ja
    for (let i = 0; i < eq.length; i++) {
        if(!eq[i].includes('(')) eq[i] = eq[i][0] + '(' + eq[i].substring(1, eq[i].length) + ')';
    }

    // Multipliquem cada denominador per la resta d'elements de l'equacio
    for (let i = 0; i < fraccions.length; i++) {
        // "Multipliquem" el denominador per cada element de l'equacio que no sigui una fraccio
        for (let i2 = 0; i2 < eq.length; i2++) {
            eq[i2] = eq[i2] + fraccions[i].denominador;
        }
        
        for (let i2 = 0; i2 < fraccions.length; i2++) {
            
            // Si es el mateix element no fem res
            if(fraccions[i] === fraccions[i2]) {
                continue;
            }
            fraccions[i2].numerador = fraccions[i2].numerador + fraccions[i].denominador;
        }
    }


    // Afegim els numeradors de les fraccions a l'equacio
    for (let i = 0; i < fraccions.length; i++) {
        eq.push(fraccions[i].simbol + fraccions[i].numerador);
    }

    // Convertim l'equacio a cadena de text
    eq = eq.toString().replaceAll(',', '').replaceAll(/\s/g, '') + '=0';
    

    console.log('----------------------------');
    return eq;
    
}