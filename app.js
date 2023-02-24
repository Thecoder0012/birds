const express = require("express"); // import
const app = express(); // instantiate

let id = 0; // id variable for auto-increment impl.
app.use(express.json()); // parses json from request bodies.

const birds = []; // empty bird array

// returns new bird object
function createBird(id, name, color) {
  return {
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
  return birds.find((bird) => bird.id === id);
}

// return bird id.
function getBirdId(id) {
  return Number(id);
}



/***********************
 * Routes: (birds api)
 ***********************/

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

// update bird partially
app.patch("/birds/:id", (req, res) => {
    const birdIndex = birds.findIndex((bird) => bird.id === Number(req.params.id));
    if(birdIndex === -1){
          res.status(404).send({ data: bird, message: `No bird found with id ${req.params.id}`});
    }else{
      const foundBird = birds[birdIndex];
      const updateBird = birds[birdIndex] = {...foundBird, ...req.body, id: foundBird.id}; // req.body replaces foundBird, and may also replace id, so we add id at last.
      birds[birdIndex] = updateBird;
      res.send({data: updateBird});
    }
  
  // another solution
  // const bird = getBird(birds, getBirdId(req.params.id));
  // if (req.body.name != null) bird.name = req.body.name;
  // if (req.body.color != null) bird.color = req.body.color;
  // res.send(bird);
});

// delete bird
app.delete("/birds/:id", (req, res) => {
  const bird = birds.findIndex(bird => bird.id === Number(req.params.id));
  if(bird === -1){
    res.status(404).send({data: bird, message: `No bird found with id ${req.params.id}` });
  } else {
    const deletedBird = birds.splice(bird, 1);
    res.send({data: deletedBird});
  }
  

});

// start port on 8080
app.listen(8080, () => {
  console.log("Server started on port", 8080);
});
