'use strict';

export { aplicaFormat };


let simbols = ['+', '-', ')'];
function aplicaFormat(eq) {

    // S'afegeix el signe + al inici si no hi ha cap signe
    if(simbols.indexOf(eq[0]) === -1) {
        eq = '+' + eq;
    }

    // S'afegeix el signe + després del signe = si no hi ha cap signe
    let posicio_igual = eq.indexOf('=');
    if(simbols.indexOf(eq[posicio_igual+1]) === -1) {
        eq = eq.replace('=', '= +');
    }

    // Es reemplaçen totes les x per 1x
    eq = eq.replaceAll('+x', '+1x').replaceAll('-x', '-1x');
    eq = eq.replaceAll('{x', '{1x').replaceAll('(x', '(1x');


    // Per fer el canvi de signes d'una banda a l'altre
    // Separa l'equació per l'igual, les fraccions i els parentesis
    eq = eq.replace('=', ' =')
    eq = eq.replaceAll('+\\frac', ' +\\frac').replaceAll('-\\frac', ' -\\frac').replaceAll('}', '} ');
    eq = eq.replaceAll('+(', ' +(').replaceAll('-(', ' -(').replaceAll(')', ') ');
    eq = eq.split(' ');

    // S'eliminen els possibles espais buits
    eq = eq.filter((elem) => elem !== '');

    // Es posen espais entre els termes que no són dins de fraccions o parèntesis
    for (let i = 0; i < eq.length; i++) {
        if(eq[i].includes('(') || eq[i].includes('frac') || eq.includes('{')){
            continue;
        }
        eq[i] = eq[i].replaceAll('+', ' +').replaceAll('-', ' -');    
    }

    eq = eq.toString().replaceAll(',', ' ');
    eq = eq.split(' ');

    // S'eliminen els possibles espais buits
    eq = eq.filter((elem) => elem !== '');

    // Es canvien els signes del membre de la dreta
    let membre1 = eq.slice(0, eq.indexOf('='));
    let membre2 = eq.slice(eq.indexOf('=')+1);
    for (let i = 0; i < membre2.length; i++) {
        membre2[i].includes('+') ? membre2[i] = membre2[i].replace('+', '-') : membre2[i] = membre2[i].replace('-', '+');
    }
    eq = membre1.concat(membre2);


    // Es converteix l'equació a cadena de text
    eq = eq.toString().replaceAll(',', '').replaceAll(/\s/g, '');

    // Es treuen els zeros de més
    eq = eq.replaceAll('+0','').replaceAll('-0','');

    return eq + '=0';
}