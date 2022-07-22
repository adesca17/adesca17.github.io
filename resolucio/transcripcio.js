'use strict';

export { transcriureEquacio };


let contenidor_equacio = document.getElementById('contenidor-equacio');

function transcriureEquacio() {
    
    // Obtenim el valor de totes les entrades
    let entrades = contenidor_equacio.getElementsByTagName('input');
    let valors_entrades = []
    for (let i = 0; i < entrades.length; i++) {
        const entrada = entrades[i];
        valors_entrades.push(entrada.value);
    }

    // Obtenim tota l'estructura html
    let equacio_html = contenidor_equacio.innerHTML;


    // ------------------------------ CONVERSIONS ------------------------------
    // FRACCIONS
    // Convertim les fraccions
    let equacio_text = equacio_html.replaceAll('<div class="fraccio">', "\\frac");

    // Convertim els numeradors i els denominadors
    equacio_text = equacio_text.replaceAll('<div class="numerador">', '{');
    equacio_text = equacio_text.replaceAll('<div class="denominador">', '{');


    // ARRELS
    equacio_text = equacio_text.replace('<sup class="sup-index">', '\\sqrt[');
    equacio_text = equacio_text.replace('<p class="arrel">√', '');
    equacio_text = equacio_text.replace('<p class="arrel-fraccio">√', '');
    equacio_text = equacio_text.replace('</p>', '');
    equacio_text = equacio_text.replace('<sub class="sub-radicand">', '{');




    // GENERAL
    // Convertim els tancaments
    equacio_text = equacio_text.replaceAll('</div></div>', '}');
    equacio_text = equacio_text.replaceAll('</div>', '}');
    equacio_text = equacio_text.replaceAll('</sup>', ']');
    equacio_text = equacio_text.replaceAll('</sub>', '}');

    // Eliminem espais en blanc innecesaris
    equacio_text = equacio_text.replaceAll(' ', '');


    // ENTRADES
    let i2 = 0;
    for (let i = 0; i < equacio_text.length; i++) {
        if(equacio_text[i] === 'i' && equacio_text[i+1] === 'n' && equacio_text[i+2] === 'p' && equacio_text[i+3] === 'u' && equacio_text[i+4] === 't') {
            let entrada = equacio_text.substring(i-1, equacio_text.indexOf('>')+1);
            equacio_text = equacio_text.replace(entrada, valors_entrades[i2]);
            i2++;
        }
    }

    // Afegim '=0' si no hi es
    if(!equacio_text.includes('=')) {
        equacio_text = equacio_text + '=0';
    }

    // Eliminem tots els espais en blanc
    equacio_text = equacio_text.replaceAll(/\s/g, '');

    // Retornem l'equacio en format MathJax
    return equacio_text;




    /*
    !Obtenir el nombre de vegades que apareix una sequencia en una cadena

    var cadena = "Cuantas 'A' hola aparecen hola en o h hola esta cadena."
    var indices = [];
    for(var i = 0; i < cadena.length; i++) {
        if (cadena[i] === "h" && cadena[i+1] === 'o') indices.push(i);
    }
    console.log(indices)


    //equacio_html.replaceAll(equacio_html.substring) */
}