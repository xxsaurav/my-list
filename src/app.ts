import express, { Application } from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware";
import myListRouter from "./routes/myListRouter";
import { mockAuthMiddleware } from "./middlewares/mockAuth";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(mockAuthMiddleware); // Use the mock user

app.use("/api/mylist", myListRouter);

app.use(errorMiddleware);

export default app;
