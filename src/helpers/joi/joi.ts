import * as joiObjectId from 'joi-objectid';
import * as Joi from '@hapi/joi';

Joi.objectId = joiObjectId(Joi);
export default Joi;
