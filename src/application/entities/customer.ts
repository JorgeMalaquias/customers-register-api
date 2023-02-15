import { Cpf } from "./cpf";

interface CustomerType {
    name: string;
    cpf: Cpf;
    birth: Date;
}

export class CustomerEntity {
    private props: CustomerType;

    constructor(value: CustomerType) {
        this.props = value;
    }

    public get name(): string {
        return this.props.name;
    }
    public get cpf(): Cpf {
        return this.props.cpf;
    }
    public get birth(): Date {
        return this.props.birth;
    }
}

