import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.send(path.join(path.resolve(), "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
