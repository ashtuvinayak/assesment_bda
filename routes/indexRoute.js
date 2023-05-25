const express = require('express');
const router = express.Router();
const Place = require('../models/Places');
const Tour = require('../models/Tours');

// Create a new place
router.post('/places', (req, res) => {
  const place = new Place(req.body);
  place.save()
    .then(savedPlace => {
      res.json(savedPlace);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Get all places
router.get('/places', (req, res) => {
  Place.find()
    .then(places => {
      res.json(places);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Update a place
router.put('/places/:id', (req, res) => {
  Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedPlace => {
      res.json(updatedPlace);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Delete a place
router.delete('/places/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id)
    .then(deletedPlace => {
      res.json(deletedPlace);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Create a new tour
router.post('/tours', (req, res) => {
  const tour = new Tour(req.body);
  tour.save()
    .then(savedTour => {
      res.json(savedTour);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Get all tours
router.get('/tours', (req, res) => {
  Tour.find()
    .then(tours => {
      res.json(tours);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Update a tour
router.put('/tours/:id', (req, res) => {
  Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTour => {
      res.json(updatedTour);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Delete a tour
router.delete('/tours/:id', (req, res) => {
  Tour.findByIdAndRemove(req.params.id)
    .then(deletedTour => {
      res.json(deletedTour);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Special Route

// Route to get tours by place slug
router.get('/tours/tour-by-place-slug/:placeSlug', (req, res) => {
  Place.findOne({ slug: req.params.placeSlug })
    .populate('tours')
    .exec((err, place) => {
      if (err || !place) {
        res.status(404).json({ error: 'Place not found' });
      } else {
        Tour.find({ places: { $in: [place._id] } })
          .exec((err, tours) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.json(tours);
            }
          });
      }
    });
});

// Route to get all places as a tree
router.get('/places/tree', (req, res) => {
  Place.find()
    .populate('parent')
    .exec((err, places) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const placeMap = {};
        places.forEach(place => {
          placeMap[place._id] = place;
          place.children = [];
        });

        const tree = [];
        places.forEach(place => {
          if (place.parent) {
            placeMap[place.parent._id].children.push(place);
          } else {
            tree.push(place);
          }
        });

        res.json(tree);
      }
    });
});


module.exports = router;
