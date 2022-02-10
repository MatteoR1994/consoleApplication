"use strict"

/*********************************************************************/

class EmptyStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class InvalidStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class PartialInvalidStringError extends Error{
    constructor(message, partialResult){
        super(message);
        this.partialResult = partialResult
    }
}

class PotentialartialInvalidStringError extends Error{
    constructor(message){
        super(message);
    }
}

class Parser {

    static csvParser(string) {
        let resultArray;
        let workString = string;
        let noSpacesString = Parser.replaceAll(workString, " ", "");
        let betterDecimalNumbersString= Parser.replaceAll(noSpacesString, ",", ".");
        try {
            resultArray = Parser.betterParseStringToNumber(betterDecimalNumbersString);
        } catch (error) {
            throw error;
        }
        return resultArray;
    }

    static betterParseStringToNumber(string) {
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota.");
        }
        let stringArray = Parser.stringToArrayByChar(string, ";");
        let stringArrayMapped = Parser.arrayNumbersParser(stringArray, parseFloat);
        let resultArray2 = Parser.checkIsNotNanEveryArrayElement(stringArrayMapped);
        if (resultArray2.length === 0) {
            throw new InvalidStringError("Stringa non valida.");
        } else {
            if (resultArray2.length === stringArray.length) {
                return resultArray2;
            } else {
                throw new PartialInvalidStringError("Stringa parzialmente non valida.", resultArray2);
            }
        }
    }

    static replaceAll(string, charToReplace, newChar) {
        const re = new RegExp(charToReplace, 'g');
        return string.replace(re, newChar);
    }

    static stringToArrayByChar(string, char) {
        return string.split(char);
    }

    static arrayNumbersParser(array, parserFunction) {
        return array.map(e => parserFunction(e));
    }

    static checkIsNotNanEveryArrayElement(array) {
        return array.filter(e => !isNaN(e));
    }

}

/*********************************************************************/

const fs = require('fs'); // questo dice "In questo momento mi serve fs, un pezzo di codice che node ha già". Per importare i moduli di node si usa 'require'.

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
            console.log("E' stata fatto un parsing parziale: ", error.partialResult);
            const sum = error.partialResult.reduce((p, c) => p = p + c, 0);
            console.log("Somma: ", sum);
        } else {
            console.log(error.message);
        }
    }
}

console.log("\nQui finisce il programma.");