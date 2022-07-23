'use strict';

export {eq_segon_grau};

// Aplica l'algoritme per resoldre equacions de segon grau
function eq_segon_grau(eq, valor0, valor1, valor2) {
    let a = parseInt(valor2);
    let b = parseInt(valor1) || 0;
    let c = parseInt(valor0) || 0;

    let x1 = (-b+Math.sqrt(Math.pow(b, 2) - 4*a*c))/(2*a) || '\\text{no té solució}';
    let x2 = (-b-Math.sqrt(Math.pow(b, 2) - 4*a*c))/(2*a) || '\\text{no té solució}';
    
    if(a < 0) a = `(${a})`;
    if(b < 0) b = `(${b})`;
    if(c < 0) c = `(${c})`;

    eq = `x = \\frac{-${b} \\pm \\sqrt{${b}^{2} - 4·${a}·${c}}}{2·${a}} =`;
    eq += '\\array{\\nearrow \\cr \\searrow} \\text{  }';
    eq += `\\array{x_{1} = ${x1} \\cr \\cr x_{2} = ${x2}}`;
    
    return eq;
    
}