const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const localOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];
const configuredOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...localOrigins, ...configuredOrigins]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ["GET"]
  })
);

app.get("/api/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "coastcart-api"
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`CoastCart API listening on port ${port}`);
});
