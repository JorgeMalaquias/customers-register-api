interface CustomerType {
    name: string;
    cpf: string;
    birth: Date;
}

export class CustomerEntity {
    private props: CustomerType;

    constructor(value: CustomerType) {
        this.props = value;
    }

    public get name() {
        return this.props.name;
    }
    public get cpf() {
        return this.props.cpf;
    }
    public get birth() {
        return this.props.birth;
    }
}