import CustomError from "../utils/customError"

const joiValidator = (schema) => {
    return (req, res, next) => {
      try {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
          console.log(validation.error.details.map((error) => error.type));
          const message = validation.error.details.map((error) => error.message);
          const error = new CustomError(400, message);
          throw error;
        }
        return next();
      } catch (error) {
        return next(error);
      }
    };
  }
  
  export default joiValidator;
  