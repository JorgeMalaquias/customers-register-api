import { Cpf } from "./cpf"

describe('Cpf entity tests', () => {

    it('Should be possible to create a cpf with valid digits', () => {
        const newCpf = new Cpf('04787677063')
        expect(newCpf).toBeTruthy();
    })
    it('Should not be possible to create a cpf with invalid digits', () => {

        expect(() => new Cpf('11122233344')).toThrow();
    })
})