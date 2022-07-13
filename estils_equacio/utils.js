'use strict';

export {redimensionaAmpladaEntrada, permetMoviment}

let contenidor_equacio = document.getElementById('contenidor-equacio');

// Funcions extres
// Redimensionar l'amplada del text
function redimensionaAmpladaEntrada(entrada) { 
    let canvas = redimensionaAmpladaEntrada.canvas || (redimensionaAmpladaEntrada.canvas = document.createElement('canvas'));
    let context = canvas.getContext('2d');
    context.font = '14px Noto Sans Math';
    context.textAlign = 'center';
    let amplada = context.measureText(entrada.value).width + 10;
    entrada.style.width = `${amplada/entrada.value.length + amplada}px`;
};


// Permet el desplaçament entre entrades
function permetMoviment(){
    let entrades = contenidor_equacio.getElementsByClassName('entrada');
    for (let i = 0; i < entrades.length; i++) {
        const entrada = entrades[i];
        entrada.addEventListener('keydown', e => {

            // Moviment amb les fletxes
            if((e.key === 'ArrowRight' && entrada.selectionStart === entrada.value.length) || e.key === 'ArrowDown'){
                e.preventDefault();
                try {
                    entrades[i+1].focus();
                } catch(e) {
                    console.log('No hi ha més entrades de text')
                }
            }

            if((e.key === 'ArrowLeft' && entrada.selectionStart === 0) || e.key === 'ArrowUp'){
                e.preventDefault();
                try {
                    entrades[i-1].focus();
                } catch(e) {
                    console.log('No hi ha més entrades de text')
                }
            }
        
        });
    }
}