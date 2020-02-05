const plantsRouter = require("express").Router();
const Plant = require("../models/plant");

plantsRouter.get("/", (request, response) => {
  Plant.find({}).then(plants => {
    response.json(plants.map(plant => plant.toJSON()));
  });
});

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

module.exports = plantsRouter;
