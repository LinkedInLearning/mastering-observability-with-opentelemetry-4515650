// eslint-disable-next-line import/order
const pkg = require("./package.json");
require("../_opentelemetry-js")(pkg.name, pkg.version);

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  return res.json({ error: err });
});

module.exports = app;
