import {customErrorClass} from "../ErrorHandler/errorClass.js";
import { signUpSchema } from "../validator/validator.js";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

export let signUp = async (req, res, next) => {
  try {
    let { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return next(
        new customErrorClass(`Invalid user input Provided`, 400, err.message),
      );
    }
    let hashedPassword = await bcrypt.hash(value.password, 10);
    let newUser = await prisma.users.create({
      data: {
        email: value.email,
        password: hashedPassword,
        user_name: value.user_name,
      },
    });
    res.status(201).json({
      success: true,
      message: `signUp successfull!`,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
