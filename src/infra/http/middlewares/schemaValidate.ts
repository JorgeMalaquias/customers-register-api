import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

/*export function validateSchemaMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            return res.status(422).send({ error: validation.error.message });
        }

        next();
    };
}*/

export class SchemaValidate {

    private static schema: ObjectSchema;

    constructor(schema: ObjectSchema) {
        SchemaValidate.schema = schema;
    }

    execute(req: Request, res: Response, next: NextFunction) {
        const validation = SchemaValidate.schema.validate(req.body);
        if (validation.error) {
            return res.status(422).send({ error: validation.error.message });
        }
        next();
    }
}