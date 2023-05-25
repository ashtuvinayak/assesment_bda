const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  status: { type: String, enum: ['published', 'not published'], default: 'not published' },
  coverImage: { type: String },
  type: { type: String, enum: ['region', 'country', 'city', 'province', 'district'] },
  code: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  geo: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  view: { type: Number, default: 0 },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  name: [{ 
    lang: { type: String },
    value: { type: String }
  }],
  description: [{ 
    lang: { type: String },
    value: { type: String }
  }],
  content: [{ 
    lang: { type: String },
    value: { type: String }
  }],
  metadata: {
    title: [{ 
      lang: { type: String },
      value: { type: String }
    }],
    description: [{ 
      lang: { type: String },
      value: { type: String }
    }]
  },
  faqs: [{
    title: [{ 
      lang: { type: String },
      value: { type: String }
    }],
    content: [{ 
      lang: { type: String },
      value: { type: String }
    }]
  }]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
