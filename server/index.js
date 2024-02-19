const express = require("express");
const bodyParser = require("body-parser");

const dbValues = [
  ["ab", "BVC", "bvc", "eas", "word", "hello", "chuk"],
  ["a", "BVC3", "b3vc", "e4as", "1word", "2hello", "ch3uk"],
  ["c", "BsdVC", "bvasdc", "evdas", "wsqord", "haccello", "czxchuk"],
];

// row -> value
// worker -> take first X rows
// spawn workers = values.len() / X

// Server Request ( values from client, creates a task and put it on a queue, returns to client Working)
// Client long pull or websocket/SSE to check on the result.

async function has_duplicates(values) {
  const frequencyMap = new Map();
  for (const value of values) {
    if (typeof value != "string") {
      throw new Error(`incorrect value type: value = ${value}`);
    }
    if (frequencyMap.get(value) != null) {
      return true;
    }
    frequencyMap.set(value, 1);
  }

  for (const dbValue of dbValues) {
    if (frequencyMap.get(dbValue) != null) {
      return true;
    }
  }

  return false;
}

const jsonParser = bodyParser.json();
const app = express();

app.use(jsonParser);
app.post("/duplicates", (req, res) => {
  const body = req.body;

  if (!body || !body.values || !Array.isArray(body.values)) {
    return res.status(400).json({
      error: "Not a string []",
    });
  }

  try {
    const result = has_duplicates(body.values);
    return res.status(200).json({
      has_duplicates: result,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(6357, () => {
  console.log("[server]: Listening on 6357");
});
