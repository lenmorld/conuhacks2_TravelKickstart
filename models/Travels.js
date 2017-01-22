var mongoose = require('mongoose');

var TravelSchema = new mongoose.Schema({
    body: String,
    person: String,
    image: String,
    // person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person'  },
    funders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
    active: Boolean
});

// Travel DB methods

mongoose.model('Travel', TravelSchema);