interface CustomerType {
    name: string;
    cpf: string;
    birth: Date;
}

export class Customer {
    private props: CustomerType;

    constructor(value: CustomerType) {
        this.props = value;
    }

    public get name() {
        return this.props.name;
    }
    public get cpf() {
        return this.props.name;
    }
    public get birth() {
        return this.props.name;
    }
}