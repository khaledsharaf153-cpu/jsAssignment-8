import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../commen/response/success.response.js";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const result = await signup(req.body);
  successResponse({
    res,
    statusCode: 201,
    msg: "Account created successfully",
    data: result,
  });
});

authRouter.post("/login", async (req, res) => {
  const result = await login(req.body);
  successResponse({
    res,
    statusCode: 200,
    msg: "You logged in successfully",
    data: result,
  });
});
