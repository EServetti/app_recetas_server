import Joi from "joi";

export const userSchema = Joi.object({
  userName: Joi.string().min(5).max(10).required().messages({
    "string.min": "name must be at least 5 characters long",
    "string.max": "name can be 10 characters long max",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "please enter a valid email",
  }),
  password: Joi.string()
    .min(8)
    .max(15)
    .regex(/^(?=.*[A-Z])(?=.*\d).*$/)
    .message(
      "password must be between 8-15 characters, include at least one uppercase letter and one number."
    )
    .required(),
  verified: Joi.boolean(),
  role: Joi.string().valid("USER", "ADMIN"),
});

export const passwordSchema = Joi.object({
    password: Joi.string()
    .min(8)
    .max(15)
    .regex(/^(?=.*[A-Z])(?=.*\d).*$/)
    .message(
      "password must be between 8-15 characters, include at least one uppercase letter and one number."
    )
    .required(),
})