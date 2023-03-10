import joi from 'joi';
import { CreateCustomerBody } from '../DTOs/create-user-body';

const customerSchema = joi.object<CreateCustomerBody>({
    name: joi.string().required().pattern(/^[A-Z]{1}/),
    cpf: [joi.string().pattern(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/).required(), joi.string().pattern(/^[0-9]{11}$/).required()],
    birth: joi.string().isoDate().required()
});

export default customerSchema;