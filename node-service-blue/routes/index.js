const express = require("express");

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost";
const client = new MongoClient(uri);

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

    return res.json({
      spaces,
      tabs,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
