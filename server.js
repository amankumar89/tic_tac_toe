import express from "express";
import path from "path";

const app = express();

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.send(path.join(path.resolve(), "dist", "index.html"));
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
