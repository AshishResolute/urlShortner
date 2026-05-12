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
  confirmPassword: joi.valid(joi.ref("password")).required().messages({
    "any.only": `Passwords dont match`,
    "any.required": `confirmPassword is required`,
  }),
  user_name: joi.string().trim().min(3).max(30).required().messages({
    "string.min": `user_name cannot be less than 3 characters`,
    "string.max": `user_name cannot be more than 30 characters`,
    "string.empty": `user_name must have an value cannot be empty`,
  }),
});

export const loginSchema = joi.object({
  email: joi.string().trim().email().required().messages({
    "string.email": `Invalid Email Provided`,
    "string.empty": `Email cannot be Empty!`,
  }),
  password: joi
    .string()
    .trim()
    .min(8)
    .max(28)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)
    .required()
    .messages({
      "string.min": `Password must have atleast 8 characters`,
      "string.max": `Password cannot have more than 28 characters!`,
      "string.empty": `Password cannot be empty`,
      "any.only": `Password must have atleast one lowercase,uppercase and a special character`,
    }),
});

export const urlSchema = joi.object({
  url: joi.string().trim().uri().required().messages({
    "string.empty": `url cannot be empty`,
    "string.uri": `Invalid URL format`,
    "string.required": `URL is required`,
  }),
});

export const shortCodeSchema = joi.object({
  short_code: joi.string().trim().length(8).required().messages({
    "string.empty": `Code cannot be empty!`,
    "string.required": `Code is required!`,
    "string.length": `Code must be 8 characters`,
  }),
});
