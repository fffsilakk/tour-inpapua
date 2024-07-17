const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/search", (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query tidak boleh kosong" });
  }

  const results = places.filter(
    (place) =>
      place.name && place.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

// Static files middleware
app.use(express.static(path.join(__dirname, "../"))); // Serve static files from the root directory

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html")); // Send index.html from the root directory
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
