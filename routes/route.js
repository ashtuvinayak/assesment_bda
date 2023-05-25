var express = require("express");
var router = express.Router();

const Place = require("../models/Places");
const Tour = require("../models/Tours");

router.get("/tours/:placeSlug", async (req, res) => {
  const { placeSlug } = req.params;
  try {
    const place = await Place.findOne({ slug: placeSlug }).exec();
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    const placeIds = [place._id];
    const childPlaces = await Place.find({ parent: place._id }, "_id").exec();
    placeIds.push(...childPlaces.map((child) => child._id));

    const tours = await Tour.find({ place: { $in: placeIds } }).exec();

    res.json({ tours });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/places/tree", async (req, res) => {
  try {
    const places = await Place.find({}).exec();
    const placeMap = {};

    // Create a map of place objects by their ID
    places.forEach((place) => {
      placeMap[place._id] = place.toObject();
      placeMap[place._id].children = [];
    });

    const rootPlaces = [];

    // Build the place tree structure
    places.forEach((place) => {
      if (place.parent) {
        placeMap[place.parent].children.push(placeMap[place._id]);
      } else {
        rootPlaces.push(placeMap[place._id]);
      }
    });

    res.json({ places: rootPlaces });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/', (req, res)=>{res.send('API works...')})

module.exports = router;
