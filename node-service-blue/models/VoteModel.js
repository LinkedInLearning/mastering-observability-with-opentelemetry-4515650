const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({
  choice: { type: String, index: true },
});

module.exports = mongoose.model('Vote', VoteSchema);