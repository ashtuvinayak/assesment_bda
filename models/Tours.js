const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  place: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  languages: [String],
  coverImage: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: Map,
    of: String,
    required: true,
  },
  content: {
    type: Map,
    of: String,
    required: true,
  },
  description: {
    type: Map,
    of: String,
    required: true,
  },
  metadata: {
    title: {
      type: Map,
      of: String,
      required: true,
    },
    description: {
      type: Map,
      of: String,
      required: true,
    },
  },
  itinerary: [
    {
      title: {
        type: Map,
        of: String,
        required: true,
      },
      content: {
        type: Map,
        of: String,
        required: true,
      },
    },
  ],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
