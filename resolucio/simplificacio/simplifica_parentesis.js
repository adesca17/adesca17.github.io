'use strict';

export { simplificaParentesis };

let simbols = ['+', '-', '*', '·', ')', undefined];

function simplificaParentesis(eq) {
    eq = formatParentesis(eq);

    // Mentre hi hagi parentesis multplicant, multiplica'ls
    let p1, p2, index;
    while(eq.includes(')(')) {
        index = eq.indexOf('+('); // L'index on comença la multiplicacio

        // Agafem el primer parentesis
        p1 = eq.substring(eq.indexOf('+('), eq.indexOf(')')+1)
        eq = eq.replace(p1, '');
        p1 = p1.replace('+(', '').replace(')', '');

        // Agafem el segon parentesis
        p2 = eq.substring(eq.indexOf('('), eq.indexOf(')')+1)
        eq = eq.replace(p2, '');
        p2 = p2.replace('(', '').replace(')', '');

        // Afegim la multiplicacio al lloc on comença
        eq = eq.substring(0, index) + multiplicaParentesis(p1, p2) + eq.substring(index, eq.length);

        // Si no hi ha mes multiplicacions eliminem els parentesis
        if(eq.indexOf(')') !== eq.indexOf(')(')) {
            eq = eq.replace('+(', '').replace(')', '');
        }
    }

    eq = eq.replaceAll('+(', '').replaceAll(')', '');

    return eq + '=0';
}





function multiplicaParentesis(p1, p2) {

    // Ajuntem els dos parentesis per donar-li format
    let conjunt = p1 + ' _' + p2;
    conjunt = conjunt.replaceAll('+', ' +').replaceAll('-', ' -').replace(' ', '');
    conjunt = conjunt.split(' ');

    // Eliminem els possibles espais buits
    conjunt = conjunt.filter((elem) => elem !== '');

    // A cada terme li establim un quocient i un grau
    for (let i = 0; i < conjunt.length; i++) {
        let quocient = 0, grau = 0;

        if(conjunt[i] === '_') {
            continue;
        }

        if(conjunt[i].includes('x')) {
            grau = 1;
            conjunt[i].replace('x', '');
        }
        quocient = parseInt(conjunt[i]);
        conjunt[i] = {'quocient':quocient, 'grau':grau};
    }

    // Obtenim els dos parentesis per separat
    p1 = conjunt.slice(0, conjunt.indexOf('_'));
    p2 = conjunt.slice(conjunt.indexOf('_')+1, conjunt.length);

    // Multipliquem els quocients i sumem els graus
    let resultat = [];
    for (let i = 0; i < p1.length; i++) {
        for (let i2 = 0; i2 < p2.length; i2++) {
            resultat.push({'quocient':(p1[i].quocient*p2[i2].quocient), 'grau':p1[i].grau+p2[i2].grau});
        }
    }

    
    // Obtenim l'expressio en format MathJax
    let resultat_final = '';
    for (let i = 0; i < resultat.length; i++) {

        // Si el quocient es més petit que 0 el signe es negatiu, sino positiu
        if(resultat[i].quocient < 0) {
            resultat_final += resultat[i].quocient.toString();
        } else {
            resultat_final += '+' + resultat[i].quocient.toString();
        }
        
        if(resultat[i].grau === 1) {
            resultat_final += 'x';
        }
    }

    return '+(' + resultat_final + ')';
}





// Per posar el signe correcte als parentesis i posar-ne si és necessari
function formatParentesis(eq) {

    // Si nomes hi ha un numero multiplicant al davant sense parentesis els afegim
    let nous_parentesis = [];
    let p = '';
    for (let i = 0; i < eq.length; i++) {
        if(eq[i] === '(' && simbols.indexOf(eq[i-1]) === -1) {
            let contador = 1;
            while(simbols.indexOf(eq[i-contador]) === -1) {
                p = eq[i-contador] + p;
                contador++;
            }
            console.log(p)
            nous_parentesis.push(p);
        }
    }
    nous_parentesis.forEach(p => eq = eq.replace(p, `(${p})`));


    eq = eq.replaceAll('(', '(+').replaceAll('(+-', '(-');
    p = '';
    let p_canviat;
    while(eq.includes('-(')) {
        p = eq.substring(eq.indexOf('-('), eq.length);
        p = p.substring(0, p.indexOf(')')+1);

        p_canviat = p.replaceAll('+', ' +').replaceAll('-', ' -');
        p_canviat = p_canviat.split(' ');
        p_canviat = p_canviat.filter((elem) => elem !== '');

        for (let i = 0; i < p_canviat.length; i++) {
            p_canviat[i].includes('+') ? p_canviat[i] = p_canviat[i].replace('+', '-') : p_canviat[i] = p_canviat[i].replace('-', '+');
        }

        p_canviat = p_canviat.toString().replaceAll(',', '');
        eq = eq.replace(p, p_canviat);
    }

    eq = eq.replace('=0', '');

    return eq;
}