"use strict"

const fs = require('fs'); // questo dice "In questo momento mi serve fs, un pezzo di codice che node ha già". Per importare i moduli di node si usa 'require'.

const {EmptyStringError, InvalidStringError, PartialInvalidStringError, PotentialartialInvalidStringError, Parser} = require('./parser.js'); // Con o senza estensione è indifferente.


//console.log(process.argv); // Leggo le cose scritte in linea di comando del terminal.

//console.log(process.argv.splice(2)); // Prendo solo gli ultimi due input.

const argie = process.argv.splice(2); // Prendo solo gli ultimi due input e li metto in una variabile array.

const fileToRead = argie[0]; // Prendo il file dove andare a leggere.
const fileToWrite = argie[1]; // Prendo il file dove andare a scrivere.

let data;
try {
    data = fs.readFileSync(fileToRead, 'utf8'); // Il default è utf8.
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
    fs.writeFileSync(fileToWrite, JSON.stringify(result)); // JSON.stringify() -> trasforma qualsiasi elemento in una stringa
} catch (error) {
    console.log(error.message);
}


console.log("\nQui finisce il programma.");