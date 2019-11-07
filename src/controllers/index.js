import { EntityNotFoundException } from '@helpers/exceptions';

export class BaseController {
    async findObjector404(modelObject, id) {
        if (!id) {
            throw new EntityNotFoundException({ id });
        }
        const model = await modelObject.findByPk(id);
        if (!model) {
            throw new EntityNotFoundException({ id });
        }
        return model;
    }
}