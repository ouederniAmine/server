//simple express server
const express = require("express");
const app = express();
const port = 3001;
//resolve CORS error
const cors = require("cors");
app.use(cors());



app.get("/", (req, res) => res.send("Hello World!"));

app.use(express.json())
app.use("/api", require("./routes/api"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
