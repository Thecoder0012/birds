const express = require("express"); // import
const app = express(); // instantiate

let id = 0;
app.use(express.json()); // parses json from request bodies.

// empty bird array
const birds = [];

// returns new bird object
function createBird(id, name, color) {
  return (newBird = {
    id: id,
    name: name,
    color: color,
  });
}

// returns all birds
function getAllBirds(birds) {
  return birds;
}

// get all birds
app.get("/birds", (req, res) => {
  res.send({
    data: getAllBirds(birds),
  });
});

// get bird
app.get("/birds/:id", (req, res) => {
  const foundBird = birds.find((bird) => bird.id === Number(req.params.id));
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
  const bird = birds.find((bird) => bird.id === Number(req.params.id));
  const birdIndex = birds.indexOf(bird);
  birds.splice(birdIndex, 1);
  res.send(bird);
});

// start port on 8080
app.listen(8080, () => {
  console.log("Server started on port", 8080);
});