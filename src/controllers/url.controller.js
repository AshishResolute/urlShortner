import prisma from "../config/prisma.js";
import { customErrorClass } from "../ErrorHandler/errorClass.js";
import { shortCodeSchema, urlSchema } from "../validator/validator.js";
import { generateShortCode } from "../utils/randomStringGenerator.js";

export const addUrl = async (req, res, next) => {
  try {
    let { error, value } = urlSchema.validate(req.body);
    if (error)
      return next(
        new customErrorClass(`Invalid URL provided`, 400, error.message),
      );

    const user_id = req.user.id;

    let checkUrlExists = await prisma.short_url.findFirst({
      where: {
        original_url: value.url,
        user_id
      },
    });

    if (checkUrlExists)
      return res.status(400).json({ message: `Url Already exists` });
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

export const redirectUrl = async (req, res, next) => {
  try {
    let { error, value } = shortCodeSchema.validate(req.params);
    if (error)
      return next(
        new customErrorClass(`Invalid input provided`, 400, error.message),
      );

    const user_id = req.user.id;

    const getUserLongURL = await prisma.short_url.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!getUserLongURL)
      return next(
        new customErrorClass(`No Urls found`, 404, `Add a url before`),
      );

    res.redirect(getUserLongURL.original_url);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
