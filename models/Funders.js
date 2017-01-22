var mongoose = require('mongoose');

var FunderSchema = new mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    name: String,
    friends: [{ type: ObjectId, ref: 'Person'}],
    travels: { type: mongoose.Schema.Types.ObjectId, ref: 'Travel'  }
});

// Person DB methods

mongoose.model('Person', FunderSchema);