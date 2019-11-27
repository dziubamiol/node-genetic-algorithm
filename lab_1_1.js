const inRegion = require('./core/region');
const { getDot, fx } = require('./core/general');


let iterations = 0;
let dots = [];
while(dots.length < 2000000) {
    const { x, y } = getDot();
    if (inRegion(x, y)) {
        dots.push({ x, y });
    }
    iterations++;
}

let max = fx(dots[0].x, dots[0].y);
let bestDot = dots[0];
for (let dot of dots) {
    const fxValue = fx(dot.x, dot.y);
    if (fxValue > max) {
        max = fxValue;
        bestDot = dot;
    }
}

console.log('MAX VALUE:', max, 'COORDINATES:', bestDot);
console.log('Iterations while generating:', iterations, 'DELTA:', iterations - 2000000, 'ITR/ACT:', iterations / 2000000);