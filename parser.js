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

module.exports = {
    EmptyStringError,
    InvalidStringError,
    PartialInvalidStringError,
    PotentialartialInvalidStringError,
    Parser
}