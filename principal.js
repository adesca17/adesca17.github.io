// Canvia entre el tema fosc i el tema clar
let tema = 'fosc'
document.getElementById('tema').addEventListener('click', e => {
    if(tema === 'fosc') {
        document.querySelector(':root').style.setProperty('--color-tema', '#000');
        document.querySelector(':root').style.setProperty('--color-fons-tema', '#f8f8f8');
        document.querySelector(':root').style.setProperty('--color-fons-2-tema', '#E0E0E0');
        document.getElementById('icona-tema').style.backgroundImage = 'url(./imatges/sol.png)';
        document.getElementById('icona-menu').style.backgroundImage = 'url(./imatges/menu_fosc.png)';
        tema = 'clar';
    
    } else {
        document.querySelector(':root').style.setProperty('--color-tema', '#fff');
        document.querySelector(':root').style.setProperty('--color-fons-tema', '#38444d');
        document.querySelector(':root').style.setProperty('--color-fons-2-tema', 'rgb(21,32,43)');
        document.getElementById('icona-tema').style.backgroundImage = 'url(./imatges/lluna.png)';
        document.getElementById('icona-menu').style.backgroundImage = 'url(./imatges/menu_clar.png)';
        tema = 'fosc';
    }
});




// Desplegar opcions del menu desplegable
let desplegat = false;
document.getElementById('menu-desplegable').addEventListener('click', e => {
    if(desplegat) {
        desplegat = false;
        document.querySelector('.menu').style.transform = 'translateY(-310px)';
    } else {
        desplegat = true;
        document.querySelector('.menu').style.transform = 'translateY(310px)';
    }
});