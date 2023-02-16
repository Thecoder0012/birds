const express = require('express');
const app = express();

app.get("/birds",(req,res) => {
    res.send({message: "Birds"});
});

app.get("/birds/:id",(req,res) => {
    res.send({message: `Bird id: ${req.params.id}`});
});

app.listen(3000)