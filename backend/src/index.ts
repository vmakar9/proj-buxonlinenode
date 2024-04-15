import { app } from "@azure/functions";

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
