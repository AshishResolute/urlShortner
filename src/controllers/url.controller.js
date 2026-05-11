import prisma from "../config/prisma.js";
import { customErrorClass } from "../ErrorHandler/errorClass.js";
import { urlSchema } from "../validator/validator.js";
import { generateShortCode } from "../utils/randomStringGenerator.js";

export const addUrl = async (req, res, next) => {
  try {
    let { error, value } = urlSchema.validate(req.body);
    if (error)
      return next(
        new customErrorClass(`Invalid URL provided`, 400, error.message),
      );

    const user_id = req.user.id;
    let short_code = generateShortCode();

    if (!short_code)
      return next(
        new customErrorClass(`Code generation failed`, 500, `Try Again later!`),
      );

    let addUserURL = await prisma.short_url.create({
      data: {
        original_url: value.url,
        short_code,
        user_id,
      },
    });

    res.status(200).json({
      success: true,
      message: `URL Added!,use the below shortCode`,
      short_code,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
