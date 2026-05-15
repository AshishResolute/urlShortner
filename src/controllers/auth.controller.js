import { customErrorClass } from "../ErrorHandler/errorClass.js";
import { loginSchema, signUpSchema } from "../validator/validator.js";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    let { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return next(
        new customErrorClass(`Invalid user input Provided`, 400, error.message),
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
    if(error.code==='P2002') return next(new customErrorClass(`Email already in use!`,409,`signUp failed!,try again with another email`))
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    let { error, value } = loginSchema.validate(req.body);
    if (error)
      return next(
        new customErrorClass(`Invalid Input Provided`, 400, error.message),
      );
    // look if user exists and get the hashedPassword
    const findUserInfo = await prisma.users.findUnique({
      where: {
        email: value.email,
      },
    });
    if (!findUserInfo)
      return next(
        new customErrorClass(
          `User not found`,
          404,
          `Try creating an account first`,
        ),
      );
    let validatePassword = await bcrypt.compare(
      value.password,
      findUserInfo.password,
    );
    if (!validatePassword)
      return next(
        new customErrorClass(
          `Incorrect Password`,
          400,
          `Passwords Dont't match,Try again`,
        ),
      );
    const token = jwt.sign(
      {
        id: findUserInfo.id,
        user_name: findUserInfo.user_name,
        email: findUserInfo.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: findUserInfo.id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" },
    );
    await prisma.users.update({
      where: {
        id: findUserInfo.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    res.cookie(`refreshToken`, refreshToken, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
      sameSite: "strict",
      path:'/'
    });
    res.status(200).json({
      success: true,
      message: `Login successfull!,Welcome Back ${findUserInfo.user_name}`,
      token,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return next(
        new customErrorClass(`Token not recieved`, 401, `Token not found`),
      );

    // jwt.validate returns the payload
    const decode = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    const validatePayload = await prisma.users.findUnique({
      where: {
        id: decode.id,
      },
    });
    if (!validatePayload || validatePayload.refresh_token !== token)
      return next(
        new customErrorClass(
          `Invalid Refresh Token Provided`,
          401,
          `User account not Found or deleted`,
        ),
      );

    const newAccessToken = jwt.sign(
      {
        id: validatePayload.id,
        user_name: validatePayload.user_name,
        email: validatePayload.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" },
    );
    const newRefreshToken = jwt.sign(
      { id: validatePayload.id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" },
    );

    await prisma.users.update({
      where: {
        id: validatePayload.id,
      },
      data: {
        refresh_token: newRefreshToken,
      },
    });

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ token: newAccessToken });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return next(
        new customErrorClass(`Token not recieved`, 401, `Logout failed!`),
      );

    let decode = jwt.verify(token, process.env.JWT_REFRESH_KEY);

    await prisma.users.update({
      where: {
        id: decode.id,
      },
      data: {
        refresh_token: null,
      },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({ message: `logged out successfully!` });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
