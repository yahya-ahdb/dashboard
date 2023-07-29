import Joi from "joi-browser";

class Validation
{
static validation(schema, data) {
    const result = Joi.validate(data, schema, { abortEarly: false });
    const { error } = result;
    if (!error) {
      return false;
    } else {
      const errors = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        console.log(message);
        // errorData[name] = message;
        errors[name]=message
      }
      return errors;
    }
  }
}
export default Validation