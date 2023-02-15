export class Cpf {
    private content;

    constructor(data: string) {
        this.content = data;
        this.validationComparing(this.content[9], this.validationCalc(this.content.substring(0, 10)).toString());
        this.validationComparing(this.content[10], this.validationCalc(this.content.substring(0, 11)).toString());
    }

    validationCalc(data: string) {
        let mult = 2;
        let sum = 0;
        for (let i = data.length - 1; i >= 0; i--) {
            console.log(`${Number(data[i])} * ${mult} = ${Number(data[i]) * mult}`);
            sum += Number(data[i]) * mult;
            mult++;
        }
        const rest = sum % 11;
        if (rest < 2) {
            return 0;
        }
        return 11 - rest;

    }
    validationComparing(digit: string, result: string) {
        /*
        if (digit !== result) {
            throw ({ type: 'conflict', message: 'The informed email is already been used!' });
        }*/
        if (digit !== result) {
            throw ('The cpf is not valid');
        }
    }
}