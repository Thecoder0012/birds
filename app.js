const express = require("express"); // import
const app = express(); // instantiate

let id = 0;
app.use(express.json()); // parses json from request bodies.

// empty bird array
const birds = [];

// returns new bird object
function createBird(id, name, color) {
    return newBird = {
        id: id,
        name: name,
        color: color,
    };
}

// returns all birds
function getAllBirds(birds) {
    return birds;
}

// return one bird
function getBird(birds, id) {
    return birds.find(bird => bird.id === id);
}

// return bird id.
function getBirdId(id) {
    return Number(id);
}
// get all birds
app.get("/birds", (req, res) => {
    res.send({
        data: getAllBirds(birds),
    });
});

// get bird
app.get("/birds/:id", (req, res) => {
    const foundBird = getBird(birds, getBirdId(req.params.id));
    res.send({
        data: foundBird,
    });
});

// add new bird
app.post("/birds", (req, res) => {
    id++;
    const newBird = createBird(id, req.body.name, req.body.color);
    birds.push(newBird);
    res.send(req.body);
});

// delete bird
app.delete("/birds/:id", (req, res) => {
    const bird = getBird(birds, getBirdId(req.body.id));
    const birdIndex = birds.indexOf(bird);
    birds.splice(birdIndex, 1);
    res.send(bird);
});

// start port on 8080
app.listen(8080, () => {
    console.log("Server started on port", 8080);
});