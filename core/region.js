const insideRegion = (x1, x2) => {
    const circleOne = (x, y) => ((x + 0.5) * (x + 0.5) + y * y <= 0.25);
    const circleTwo = (x, y) => (x * x + (y + 0.5) * (y + 0.5) <= 0.25);
    const circleThree = (x, y) => ((x - 0.5) * (x - 0.5) + y * y <= 0.25);
    const circleFour = (x, y) => (x * x + (y - 0.5) * (y - 0.5) <= 0.25);

    return circleOne(x1, x2) && circleTwo(x1, x2)
        || circleTwo(x1, x2) && circleThree(x1, x2)
        || circleThree(x1, x2) && circleFour(x1, x2)
        || circleFour(x1, x2) && circleOne(x1, x2);
};

module.exports = insideRegion;
