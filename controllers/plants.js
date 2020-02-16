const jwt = require("jsonwebtoken");

const plantsRouter = require("express").Router();
const Plant = require("../models/plant");
const User = require("../models/user");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// Get all plants
plantsRouter.get("/", async (request, response) => {
  const token = getTokenFrom(request);

  if (!token) {
    return response
      .status(401)
      .json({ error: "No token" })
      .end();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const plants = await Plant.find({ _id: { $in: user.plants } });

    response.json(plants.map(plant => plant.toJSON()));
  } catch (error) {
    error => response.status(400).end();
  }

  // Find All

  // Plant.find({}).then(plants => {
  //   response.json(plants.map(plant => plant.toJSON()));
  // });
});

// Add new plant
plantsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const plant = new Plant({
      name: body.name,
      light: body.light,
      water: body.water,
      lastWatered: body.lastWatered,
      user: user._id
    });

    const savedPlant = await plant.save();
    user.plants = user.plants.concat(savedPlant._id);
    await user.save();
    response.json(savedPlant.toJSON());
  } catch (exception) {
    next(exception);
  }
});

// Delete plant
plantsRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);

  if (!token) {
    return response
      .status(401)
      .json({ error: "No token" })
      .end();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "token invalid" })
        .end();
    }

    const user = await User.findById(decodedToken.id);
    const plant = await Plant.findById(request.params.id);

    if (!user || !plant) {
      return response
        .status(401)
        .json({ error: "user or plant not found" })
        .end();
    }

    if (plant.user.toString() === user.id.toString()) {
      Plant.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end();
      });
    } else {
      return response
        .status(401)
        .json({ error: "User is not the owner of this plant" })
        .end();
    }
  } catch {
    error => response.status(400).end();
  }
});

// Update plant
plantsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);

  if (!token) {
    return response
      .status(401)
      .json({ error: "No token" })
      .end();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .json({ error: "token invalid" })
        .end();
    }

    const user = await User.findById(decodedToken.id);
    const plant = await Plant.findById(request.params.id);

    if (!user || !plant) {
      return response
        .status(401)
        .json({ error: "user or plant not found" })
        .end();
    }
    const updatedPlant = {
      name: body.name,
      light: body.light,
      water: body.water,
      lastWatered: body.lastWatered
    };

    Plant.findByIdAndUpdate(request.params.id, updatedPlant).then(result => {
      response.status(201).end();
    });
  } catch {
    error => response.status(400).end();
  }
});

module.exports = plantsRouter;
