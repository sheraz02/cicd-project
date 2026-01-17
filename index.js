const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const appRoutes = require("./routes/app.routes");
app.use("/api", appRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "DevOps Project API is running 🚀",
    status: "OK"
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
