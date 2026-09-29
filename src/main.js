import express from "express";
import { PORT } from "./config/config.js";
import { globalErrorHandler } from "./middleware/errorHandler.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { authRouter } from "./module/auth/auth.controller.js";
import { testDBConnection } from "./DB/db.connection.js";
import { userRouter } from "./module/user/user.controller.js";
async function bootstrap() {
  const server = express();
  await testDBConnection();
  server.use(express.json());
  server.use("/auth", authRouter);
  server.use("/user", userRouter);

  server.use("{/*dummy}", notFoundMiddleware);
  server.use(globalErrorHandler);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
