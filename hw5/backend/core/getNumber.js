var number;

const getNumber = () => {
    return number;
}

const genNumber = () => {
    number =  Math.floor(Math.random() * 100) + 1;
    console.log('answer:');
    console.log(number);
}

export {getNumber, genNumber};


