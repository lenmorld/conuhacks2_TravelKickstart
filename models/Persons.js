var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
    id: Number,
    email: String,
    password: String,
    name: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
    travels: { type: mongoose.Schema.Types.ObjectId, ref: 'Travel'  }
});

// Person DB methods

mongoose.model('Person', PersonSchema);