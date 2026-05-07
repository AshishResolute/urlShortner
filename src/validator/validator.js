import joi from "joi";

export const signUpSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": `Invalid email provided!`,
  }),
  password: joi
    .string()
    .trim()
    .min(8)
    .max(28)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)
    .required()
    .messages({
      "string.min": `Password must be atleast 8 characters long!`,
      "string.max": `Password must be less than 28 characters!`,
      "string.empty": `Password cannot be empty`,
      "any.only": `password must have atleast one lowercase,uppercase and a special character`,
    }),
  user_name: joi.string().trim().min(3).max(30).required().messages({
    "string.min": `user_name cannot be less than 3 characters`,
    "string.max": `user_name cannot be more than 30 characters`,
    "string.empty": `user_name must have an value cannot be empty`,
  }),
});
