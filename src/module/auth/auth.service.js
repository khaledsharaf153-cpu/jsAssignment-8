import {
  ConflictException,
  UnauthorizedException,
} from "../../commen/exceptions/app.exceptions.js";
import { encryptValue } from "../../commen/security/encryption.js";
import { compareValue, hashValue } from "../../commen/security/hashing.js";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SIGNATURE,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SIGNATURE,
} from "../../config/config.js";
import { createDoc, findOneDoc } from "../../DB/db.repo.js";
import { userModel } from "../../DB/model/user.model.js";
import jwt from "jsonwebtoken";

export async function signup(bodyData) {
  const { email } = bodyData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (user) {
    throw ConflictException("Email already exists");
  }
  bodyData.password = await hashValue(bodyData.password);
  if (bodyData.phoneNumber) {
    bodyData.phoneNumber = encryptValue(bodyData.phoneNumber);
  }
  return await createDoc({ model: userModel, data: bodyData });
}

export async function login(bodyData) {
  const { email, password } = bodyData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (!user) {
    throw UnauthorizedException("Invalid email or password");
  }
  const isMatch = await compareValue(password, user.password);
  if (!isMatch) {
    throw UnauthorizedException("Invalid email or password");
  }

  const accessToken = jwt.sign({}, JWT_ACCESS_SIGNATURE, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
    subject: payload.sub,
  });

  const refreshToken = jwt.sign({}, JWT_REFRESH_SIGNATURE, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    subject: payload.sub,
  });

  return { accessToken, refreshToken };
}
