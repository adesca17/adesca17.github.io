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

    // POTENCIES I ARRELS
    while(equacio_text.includes('</sup>')) {
        let index_arrel = equacio_text.indexOf('<sup class="sup-index">');
        let index_exponent =  equacio_text.indexOf('<sup class="sup-exponent">');
        
        // Si no hi ha més arrels o exponents, fem com si fossin a l'index 100000
        // D'aquesta manera es canviarà únicament l'altre element
        if(index_arrel === -1) index_arrel = 100000;
        if(index_exponent === -1) index_exponent = 100000;
        
        // Si l'index de l'arrel és major a l'index de l'exponent (és a dir, l'arrel està més a prop)
        if(index_arrel > index_exponent) {
            equacio_text = equacio_text.replace('<sup class="sup-exponent">', '^{');
            equacio_text = equacio_text.replace('</sup>', '}');
        } else {
            equacio_text = equacio_text.replace('<sup class="sup-index">', '\\sqrt[');
            equacio_text = equacio_text.replace('</sup>', ']');
        }
    }

    // ARRELS 
    equacio_text = equacio_text.replaceAll('<p class="arrel">√', '');
    equacio_text = equacio_text.replaceAll('<p class="arrel-fraccio">√', '');
    equacio_text = equacio_text.replaceAll('</p>', '');
    equacio_text = equacio_text.replaceAll('<sub class="sub-radicand">', '{');
    


    // GENERAL
    // Convertim els tancaments
    equacio_text = equacio_text.replaceAll('</div></div>', '}');
    equacio_text = equacio_text.replaceAll('</div>', '}');
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
    
}