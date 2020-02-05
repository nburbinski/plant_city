const plantsRouter = require("express").Router();
const Plant = require("../models/plant");

// Get all plants
plantsRouter.get("/", (request, response) => {
  Plant.find({}).then(plants => {
    response.json(plants.map(plant => plant.toJSON()));
  });
});

// Add new plant
plantsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const plant = new Plant({
    name: body.name,
    location: body.location,
    light: body.light,
    water: body.water
  });

  plant
    .save()
    .then(savedPlant => {
      response.json(savedPlant.toJSON());
    })
    .catch(error => next(error));
});

// Delete plant
plantsRouter.delete("/:id", (request, response) => {
  Plant.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

// Update plant
plantsRouter.put("/:id", (request, response) => {
  const body = request.body;

  const plant = {
    name: body.name,
    location: body.location,
    light: body.light,
    water: body.water
  };

  Plant.findByIdAndUpdate(request.params.id, plant, { new: true }).then(
    updated => {
      response.json(updated.toJSON());
    }
  );
});

module.exports = plantsRouter;
