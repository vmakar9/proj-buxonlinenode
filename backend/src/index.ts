import { app } from "@azure/functions";

import { helloController } from "./controllers/hello.controller";
import { vacancyController } from "./controllers/vacancy.controller";

app.http("vacancies", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "vacancy",
  handler: vacancyController.getAll.bind(vacancyController),
});

app.http("vacancies", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "vacancy/{_id}",
  handler: vacancyController.getById.bind(vacancyController),
});

app.http("hello", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "hello",
  handler: helloController.hello.bind(helloController),
});
