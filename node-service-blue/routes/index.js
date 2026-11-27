const express = require("express");
const { trace } = require("@opentelemetry/api");

const router = express.Router();
const { MongoClient } = require("mongodb");
const pkg = require("../package.json");

const tracer = trace.getTracer(pkg.name, pkg.version);

const uri = "mongodb://localhost";
const client = new MongoClient(uri);

// Fibonacci function to simulate delay
function fibonacci(n) {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    await client.connect({ useNewUrlParser: true });

    const database = client.db("voting");
    const votes = database.collection("votes");

    if (req.query.choice === "clear") {
      // This will delete all documents in the votes collection
      await votes.deleteMany({});
    } else if (req.query.choice) {
      // Insert a new document with the choice
      await votes.insertOne({ choice: req.query.choice });
    }

    const spaces = await votes.countDocuments({ choice: "spaces" });
    const tabs = await votes.countDocuments({ choice: "tabs" });

    if (Math.random() < 0.5) {
      tracer.startActiveSpan("fibonacci", (span) => {
        fibonacci(40);
        span.end();
      });
    }

    return res.json({
      spaces,
      tabs
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
