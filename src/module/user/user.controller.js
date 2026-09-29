import { Router } from "express";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
import { successResponse } from "../../commen/response/success.response.js";
import { tokenTypeEnum } from "../../commen/enum/token.enum.js";
import { rotateToken } from "./user.service.js";

export const userRouter = Router();

userRouter.post(
  "/rotate-token",
  authMiddleware(tokenTypeEnum.REFRESH),
  async (req, res) => {
    const result = rotateToken(req.payload);

    successResponse({ res, data: result, statusCode: 200 });
  },
);

userRouter.get("/get-profile", authMiddleware(), async (req, res) => {
  successResponse({ res, data: req.user, statusCode: 200 });
});
