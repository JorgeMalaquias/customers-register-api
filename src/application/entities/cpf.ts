export class Cpf {
    private content: string;

    constructor(data: string) {

        if (data.length !== 11) {
            throw ('Invalid cpf format!');
        }
        this.content = data;

        let verifyingDigit = this.validationCalc(this.content.substring(0, 9));
        this.validationComparing(this.content[9], verifyingDigit);

        verifyingDigit = this.validationCalc(this.content.substring(0, 10));
        this.validationComparing(this.content[10], verifyingDigit);
    }

    validationCalc(data: string): string {
        let mult = 2;
        let sum = 0;
        for (let i = data.length - 1; i >= 0; i--) {
            sum += Number(data[i]) * mult;
            mult++;
        }
        const rest = sum % 11;
        if (rest < 2) {
            return '0';
        }
        return (11 - rest).toString();

    }
    validationComparing(digit: string, result: string) {

        if (digit !== result) {
            throw ({ type: 'unprocessable_entity', message: 'Invalid cpf!' });
        }
    }

    public get value() {
        return this.content;
    }
}