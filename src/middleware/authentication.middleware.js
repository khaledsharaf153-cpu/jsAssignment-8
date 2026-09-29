import { UnauthorizedException } from "../commen/exceptions/app.exceptions.js";
import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SIGNATURE,
  JWT_REFRESH_SIGNATURE,
} from "../config/config.js";
import { findDocById } from "../DB/db.repo.js";
import { userModel } from "../DB/model/user.model.js";
import { tokenTypeEnum } from "../commen/enum/token.enum.js";

export function authMiddleware(tokenType = tokenTypeEnum.ACCESS) {
  return async function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      throw UnauthorizedException();
    }
    const payload = jwt.verify(
      token,
      tokenType == tokenTypeEnum.ACCESS
        ? JWT_ACCESS_SIGNATURE
        : JWT_REFRESH_SIGNATURE,
    );
    if (!payload.sub) {
      throw UnauthorizedException("id not found");
    }

    const user = await findDocById({ model: userModel, id: payload.sub });

    if (!user) {
      throw UnauthorizedException("User not found");
    }

    req.user = user;
    req.payload = payload;

    next();
  };
}
