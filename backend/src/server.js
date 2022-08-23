import express from "express";
import db from "./db";
import { routes } from "./routes";

const app = express();

app.use(express.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

db.connect().then(() => {
  app.listen(8080, () => {
    console.log("server is up!");
  });
});
