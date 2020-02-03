const plantsRouter = require("express").Router();
const Plant = require("../models/plant");

plantsRouter.get("/", (request, response) => {
  Plant.find({}).then(plants => {
    response.json(plants.map(plant => plant.toJSON()));
  });
});

module.exports = plantsRouter;
