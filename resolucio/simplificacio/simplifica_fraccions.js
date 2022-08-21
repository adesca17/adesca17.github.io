'use strict';

export { simplificaFraccions };

function simplificaFraccions(eq) {

    // Se separen tots els elements
    eq = eq.replaceAll('(', ' (').replaceAll(')', ') ').replace('=0', '');
    eq = eq.split(' ');
    for (let i = 0; i < eq.length; i++) {
        if(!eq[i].includes('(')) eq[i] = eq[i].replaceAll('+', ' +').replaceAll('-', ' -');
    }
    eq = eq.toString().replaceAll(',', ''); // Es converteix l'equació a cadena de text

    // S'extrau totes les fraccions
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

    // S'afegeixen espais i es crea una llista on se separa per aquests
    eq = eq.split(' ');

    // S'eliminen els possibles espais buits
    eq = eq.filter((elem) => elem !== '');
    
    // Es posen parèntesis a cada element de l'equació si no en tenen
    for (let i = 0; i < eq.length; i++) {
        if(!eq[i].includes('(')) eq[i] = eq[i][0] + '(' + eq[i].substring(1, eq[i].length) + ')';
    }

    // Es multiplica cada denominador per la resta d'elements de l'equació
    for (let i = 0; i < fraccions.length; i++) {
        // Es multiplica el denominador per cada element de l'equació que no sigui una fracció
        for (let i2 = 0; i2 < eq.length; i2++) {
            eq[i2] = eq[i2] + fraccions[i].denominador;
        }
        
        for (let i2 = 0; i2 < fraccions.length; i2++) {
            
            // Si és el mateix element no es fa res
            if(fraccions[i] === fraccions[i2]) {
                continue;
            }
            fraccions[i2].numerador = fraccions[i2].numerador + fraccions[i].denominador;
        }
    }


    // S'afegeixen els numeradors de les fraccions a l'equació
    for (let i = 0; i < fraccions.length; i++) {
        eq.push(fraccions[i].simbol + fraccions[i].numerador);
    }

    // Es converteix l'equació a cadena de text
    eq = eq.toString().replaceAll(',', '').replaceAll(/\s/g, '') + '=0';

    return eq;
}