'use strict';

export { simplificaParentesis };

let simbols = ['+', '-', '*', '·', ')', undefined];

function simplificaParentesis(eq) {
    eq = formatParentesis(eq);

    // Mentre hi hagi parèntesis multiplicant, multiplica'ls
    let p1, p2, index;
    while(eq.includes(')(')) {
        index = eq.indexOf('+('); // L'índex on comença la multiplicació

        // S'agafa el primer parèntesis
        p1 = eq.substring(eq.indexOf('+('), eq.indexOf(')')+1)
        eq = eq.replace(p1, '');
        p1 = p1.replace('+(', '').replace(')', '');

        // S'agafa el segon parèntesis
        p2 = eq.substring(eq.indexOf('('), eq.indexOf(')')+1)
        eq = eq.replace(p2, '');
        p2 = p2.replace('(', '').replace(')', '');

        // S'afegeix la multiplicació al lloc on comença
        eq = eq.substring(0, index) + multiplicaParentesis(p1, p2) + eq.substring(index, eq.length);

        // Si no hi ha més multiplicacions s'eliminen els parèntesis
        if(eq.indexOf(')') !== eq.indexOf(')(')) {
            eq = eq.replace('+(', '').replace(')', '');
        }
    }

    eq = eq.replaceAll('+(', '').replaceAll(')', '');

    return eq + '=0';
}

function multiplicaParentesis(p1, p2) {

    // S'ajunten els dos parèntesis per donar-li format
    let conjunt = p1 + ' _' + p2;
    conjunt = conjunt.replaceAll('+', ' +').replaceAll('-', ' -').replace(' ', '');
    conjunt = conjunt.split(' ');

    // S'eliminen els possibles espais buits
    conjunt = conjunt.filter((elem) => elem !== '');

    // A cada terme se li estableix un quocient i un grau
    for (let i = 0; i < conjunt.length; i++) {
        let quocient = 0, grau = 0;

        if(conjunt[i] === '_') {
            continue;
        }

        if(conjunt[i].includes('x')) {
            grau += 1;
            conjunt[i].replace('x', '');
        }

        if(conjunt[i].includes('^{2}')) {
            grau += 1;
            conjunt[i].replace('^{2}', '');
        }

        quocient = parseInt(conjunt[i]);
        conjunt[i] = {'quocient':quocient, 'grau':grau};
    }

    // S'obtenen els dos parèntesis per separat
    p1 = conjunt.slice(0, conjunt.indexOf('_'));
    p2 = conjunt.slice(conjunt.indexOf('_')+1, conjunt.length);

    // Es multipliquen els quocients i es sumen els graus
    let resultat = [];
    for (let i = 0; i < p1.length; i++) {
        for (let i2 = 0; i2 < p2.length; i2++) {
            resultat.push({'quocient':(p1[i].quocient*p2[i2].quocient), 'grau':p1[i].grau+p2[i2].grau});
        }
    }
    
    // S'obté l'expressió en format MathJax
    let resultat_final = '';
    for (let i = 0; i < resultat.length; i++) {

        // Si el quocient es més petit que zero el signe es negatiu, sinó positiu
        if(resultat[i].quocient < 0) {
            resultat_final += resultat[i].quocient.toString();
        } else {
            resultat_final += '+' + resultat[i].quocient.toString();
        }
        
        if(resultat[i].grau === 1) {
            resultat_final += 'x';
        }

        if(resultat[i].grau === 2) {
            resultat_final += 'x^{2}';
        }

    }

    return '+(' + resultat_final + ')';
}

// Per posar el signe correcte als parèntesis i posar-ne si és necessari
function formatParentesis(eq) {

    // Si només hi ha un numero multiplicant al davant sense parèntesis, s'afegeixen
    let p = '';
    for (let i = 0; i < eq.length; i++) {
        if(eq[i] === '(' && simbols.indexOf(eq[i-1]) === -1) {
            let contador = 1;
            while(simbols.indexOf(eq[i-contador]) === -1) {
                p = eq[i-contador] + p;
                contador++;
            }

            // Es reemplaça el numero pel mateix numero entre parèntesis
            eq = eq.replace(eq.substring(i-contador, i), eq.substring(i-contador, i).replace(p, `(${p})`))
        }
    }

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