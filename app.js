"use strict"

const fs = require('fs'); // questo dice "In questo momento mi serve fs, un pezzo di codice che node ha già". Per importare i moduli di node si usa 'require'.

const {EmptyStringError, InvalidStringError, PartialInvalidStringError, PotentialartialInvalidStringError, Parser} = require('./parser.js'); // Con o senza estensione è indifferente.

let data;
try {
    data = fs.readFileSync('./test.csv', 'utf8'); // Il default è utf8.
    //console.log(data);
} catch (err) {
    console.log("\nProblemi durante la lettura del file.\n");
    console.error(err);
}


let result;
try {
    result = Parser.csvParser(data);
    console.log("Array risultato: ", result);
    const sum = result.reduce((p, c) => p = p + c, 0);
    console.log("Somma elementi array: ", sum);
} catch (error) {
    if (error instanceof EmptyStringError) {
        console.log(error.message);
    } else {
        if (error instanceof PartialInvalidStringError) {
            console.log(error.message);
            result = error.partialResult;
            console.log("E' stata fatto un parsing parziale: ", result);
            const sum = result.reduce((p, c) => p = p + c, 0);
            console.log("Somma elementi array: ", sum);
        } else {
            console.log(error.message);
        }
    }
}


try {
    fs.writeFileSync("./result.json", JSON.stringify(result)); // JSON.stringify() -> trasforma qualsiasi elemento in una stringa
} catch (error) {
    console.log(error.message);
}


console.log("\nQui finisce il programma.");