const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }],
  price: { type: Number },
  images: [{ type: String }],
  languages: [{ type: String }],
  coverImage: { type: String },
  duration: { type: String },
  sku: { type: String },
  name: [{ 
    lang: { type: String },
    value: { type: String }
  }],
  content: [{ 
    lang: { type: String },
    value: { type: String }
  }],
  description: [{ 
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
  itinerary: [{
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

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
