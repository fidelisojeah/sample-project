import Joi from '@hapi/joi';

export const validate = (schema, details) => {
    const value = schema.validateAsync(details, { language: '{{key}}', abortEarly: false, stripUnknown: true })
    return value;
};

export const validateChoreDetails = (details) => {
    const schema = Joi.object({
        description: Joi.string().required(),
        name: Joi.string().required()
    });

    return validate(schema, details);
};

export const validateUserDetails = (details) => {
    const schema = Joi.object({
        email: Joi.string().trim().lowercase().min(5)
            .max(255)
            .email()
            .required(),
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
    });

    return validate(schema, details);
};

export const validateSchedule = (details, requireChore) => {
    const schema = Joi.object({
        chore: requireChore ? Joi.string().uuid().required() : Joi.string().uuid(),
        // start: Joi.date().default(new Date()), // implement later
        user: Joi.string().uuid().required(),
        schedule_date: Joi.date().default(new Date()).raw(),
        type: Joi.string().valid('one-off', 'weekly', 'bi_weekly', 'monthly', 'daily').required()
    });

    return validate(schema, details);
}