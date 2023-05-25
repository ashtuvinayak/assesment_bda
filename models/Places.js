const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['published', 'not published'],
    default: 'published',
  },
  coverImage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['region', 'country', 'city', 'province', 'district'],
    required: true,
  },
  code: {
    type: String,
    default: null,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    default: null,
  },
  geo: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  view: {
    type: Number,
    default: 0,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: Map,
    of: String,
    required: true,
  },
  description: {
    type: Map,
    of: String,
    required: true,
  },
  content: {
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
  faqs: [
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

placeSchema.index({ geo: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
