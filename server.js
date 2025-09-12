// server.js
import app from "./app.js";

const PORT = process.env.PORT || 5005;

console.log("Server is running...");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
