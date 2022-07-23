'use strict';

export { reduirTermes };

function reduirTermes(eq) {
    eq = eq.replaceAll('+', ' +').replaceAll('-', ' -').replace('=0', '');
    eq = eq.split(' ');
    
    // Eliminem els possibles espais buits
    eq = eq.filter((elem) => elem !== '');

    let valor0 = 0, valor1 = 0, valor2 = 0;
    for (let i = 0; i < eq.length; i++) {
        if(eq[i].includes('x^{2}')) {
            valor2 += parseInt(eq[i].replace('x^{2}', ''));
        } else if(eq[i].includes('x')) {
            valor1 += parseInt(eq[i].replace('x', ''));
        } else {
            valor0 += parseInt(eq[i]);
        }
    }

    // Afegim els signes + si és el cas
    if(valor0 > 0) {
        valor0 = '+' + valor0.toString();
    }

    if(valor1 > 0) {
        valor1 = '+' + valor1.toString();
    }

    // Afegim les x
    valor1 = valor1.toString() + 'x';
    valor2 = valor2.toString() + 'x^{2}';

    // Eliminem les variables en cas de que el valor sigui 0
    if(valor0 === 0) {
        valor0 = '';
    }

    if(valor1 === '0x') {
        valor1 = '';
    }

    if(valor2 === '0x^{2}') {
        valor2 = '';
    }

    eq = `${valor2}${valor1}${valor0} = 0`;

    return [eq, valor0, valor1.replace('x', ''), valor2.replace('x^{2}', '')];
}

