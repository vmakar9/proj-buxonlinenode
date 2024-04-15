import { app, HttpResponseInit } from "@azure/functions";


import { vacancyController } from "./controllers/vacancy.controller";

export async function httpTrigger1(): Promise<HttpResponseInit> {
  return { body: "Hello world" };
}

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
  handler: httpTrigger1,
});
