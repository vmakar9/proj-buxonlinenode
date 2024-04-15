import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./erorr/api.error";
import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { candidateRouter } from "./routers/candidate.router";
import { companyRouter } from "./routers/company.router";
import { feedbackonvacancyRouter } from "./routers/feedbackonvacancy.router";
import { helloRouter } from "./routers/hello.router";
import { hrRouter } from "./routers/hr.router";
import { vacancyRouter } from "./routers/vacany.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/auth", authRouter);
app.use("/candidate", candidateRouter);
app.use("/hr", hrRouter);
app.use("/company", companyRouter);
app.use("/admin", adminRouter);
app.use("/vacancy", vacancyRouter);
app.use("/vacancy-feedback", feedbackonvacancyRouter);
app.use("/hello", helloRouter);

app.use("*", (err: ApiError, req: Request, res: Response) => {
  return res.status(err?.status || 500).json({
    message: err?.message,
    status: err?.status,
  });
});
const startServer = async () => {
  try {
    await mongoose.connect(configs.DB_URL);
    console.log("Connected to MongoDB");

    app.listen(configs.PORT, () => {
      console.log(`Server is running on port ${configs.PORT}`);
    });
  } catch (err) {
    throw new ApiError(err.message, err.status);
  }
};

startServer();
