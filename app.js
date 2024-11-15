const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "Accept",
      "X-Requested-With",
    ],
  })
);

const contactsRouter = require("./routes/contactsRoute");

app.use("/api/v1/contacts", contactsRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Requested URL not found!",
  });
});
module.exports = app;
