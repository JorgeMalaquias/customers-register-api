import { Customer } from "@prisma/client";
import { Replace } from "../../helpers/replace";
import { CreateCustomerBody } from "../../infra/http/DTOs/create-user-body";
import { CustomerEntity } from "../entities/customer";



export function cpfMapper(data: string): string {
    return data?.replace('-', '').replace('.', '').replace('.', '');
}

export function customerRepositoryMapper(data: CustomerEntity): Replace<Customer, { id?: number }> {
    return {
        name: data.name,
        cpf: data.cpf.value,
        birth: data.birth
    };
}