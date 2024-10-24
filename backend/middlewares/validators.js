import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(250)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()]).{6,20}$")
    ),
});

export const signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(250)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()]).{6,20}$")
    ),
});
