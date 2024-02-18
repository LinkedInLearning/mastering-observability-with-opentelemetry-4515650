const express = require("express");

const router = express.Router();
const axios = require("axios");

const votes = {
  spaces: [],
  tabs: [],
};

module.exports = () => {
  router.get("/", async (req, res, next) => {
    try {
      if (
        req.query.choice &&
        req.query.choice !== "spaces" &&
        req.query.choice !== "tabs" &&
        req.query.choice !== "clear"
      ) {
        return res.status(400).end();
      }

      const { data } = await axios.get(
        `http://127.0.0.1:3001?choice=${req.query.choice}`
      );
      return res.render("index", data);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
