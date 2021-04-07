const path = require("path");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
