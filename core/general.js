const fx = (x1, x2) => x1 * x1 - x2 * x2 * x2;

const getDot = () => {
    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;

    return { x, y }
};


module.exports = { getDot, fx };