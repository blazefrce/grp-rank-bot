const express = require("express");
const noblox = require("noblox.js");

const app = express();

app.get("/", (req, res) => {
    res.send("GRP Rank Bot Online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
