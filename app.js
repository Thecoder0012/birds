const express = require('express'); // import
const app = express(); // instantiate

const birds = [
    {id: 1, name: "Starling"}
];

app.get("/birds",(req,res) => {
    res.send({data: birds});
});

app.get("/birds/:id",(req,res) => {
    const foundBird = birds.find(bird => bird.id === Number(req.params.id));
    res.send({data: foundBird});
});

app.listen(8080,() => {
    console.log("Server started on port",8080);
})