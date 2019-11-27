const inRegion = require('./core/region');
const { getDot, fx } = require('./core/general');


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};


const getRandom = () => {
    return Math.random() / 8 - 0.125;
};


const getEffectiveness = (population) => {
    let sum = 0;
    for (let person of population) {
        sum += fx(person.x, person.y);
    }

    return sum / population.length;
};


const compare = (a, b) => {
    const aValue = fx(a.x, a.y);
    const bValue = fx(b.x, b.y);

    return bValue - aValue; //sort from bigger to smaller
};


const mutate = (population) => {
    for (let i = 0; i < Math.floor(population.length * 0.2); i++) { // mutate 20% of population
        const position = getRandomInt(population.length);
        const mutated = {
            x: population[position].x + getRandom(),
            y: population[position].x + getRandom(),
        };

        if (inRegion(mutated.x, mutated.y)) { // check if mutation is good to still be alive
            population[position] = mutated;
        }
    }
};


const spawn = (population) => {
    const parents = population.length;

    for (let i = 0; i < parents; i++) {
        const mother = population[getRandomInt(parents)]; // incest is possible, too lazy to change this
        const father = population[i];

        const son = {
            x: (father.x + mother.x) / 2,
            y: (father.y + mother.y) / 2,
        };

        if (inRegion(son.x, son.y)) { // check if son can live
            population.push(son);
        }
    }

    while (population.length < 5000) { // if population dying - generate more persons
        const mother = population[getRandomInt(parents)]; // incest is possible, too lazy to change this
        const father = population[getRandomInt(parents)];

        const son = {
            x: (father.x + mother.x) / 2,
            y: (father.y + mother.y) / 2,
        };

        if (inRegion(son.x, son.y)) { // check if son can live
            population.push(son);
        }
    }
};


const kill = (population) => {
    population.splice(population.length / 2);
};



// generate first population
let population = [];
while(population.length < 20000) {
    const { x, y } = getDot();
    if (inRegion(x, y)) {
        population.push({ x, y });
    }
}

// lifespan
while (true) {
    let effectiveness = getEffectiveness(population);
    console.log(effectiveness); // get effectiveness

    if (effectiveness > 0.374724) { // exit if effective
        console.log("EXIT");
        population.sort(compare);

        const bestPerson = population[0];
        console.log('PEAK:', fx(bestPerson.x, bestPerson.y));
        console.log('COORDINATES:', bestPerson);
        process.exit(0);
    }

    population.sort(compare); // sort from better to worst
    kill(population); // kill 1/2 of bad population

    mutate(population);
    spawn(population);
}


