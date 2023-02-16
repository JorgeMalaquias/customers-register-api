import { cpfMapper } from "../mappers/customerRepositoryMapper"
import { Cpf } from "./cpf"
import { CustomerEntity } from "./customer"

describe('Customer entity tests', () => {
    it('Should be possible to create a customer with valid data', () => {
        const newCustomer = new CustomerEntity({
            name: 'Jorge Malaquia',
            cpf: new Cpf('04787677063'),
            birth: new Date('2000-03-15')
        })
        expect(newCustomer).toBeTruthy();
    })
    it('Should not be possible to create a customer with invalid cpf', () => {

        expect(() => new CustomerEntity({
            name: 'Jorge Malaquia',
            cpf: new Cpf('04787677069'),
            birth: new Date('2000-03-15')
        })).toThrow();
    })
})