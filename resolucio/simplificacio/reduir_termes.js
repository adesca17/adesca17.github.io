

export { reduirTermes };

function reduirTermes(eq) {
    eq = eq.replaceAll('+', ' +').replaceAll('-', ' -').replace('=0', '');
    eq = eq.split(' ');
    
    // Eliminem els possibles espais buits
    eq = eq.filter((elem) => elem !== '');

    let valor0 = 0, valor1 = 0;
    for (let i = 0; i < eq.length; i++) {
        if(eq[i].includes('x')) {
            valor1 += parseInt(eq[i].replace('x', ''));
        } else {
            valor0 += parseInt(eq[i]);
        }
        
    }

    eq = `${valor1}x ${valor0} = 0`;

    if(valor0 >= 0) {
        eq = `${valor1}x + ${valor0} = 0`;
    }

    return [eq, valor0, valor1];
}

