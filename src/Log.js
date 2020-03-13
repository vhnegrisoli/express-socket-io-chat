const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const LogSchema = new Schema({
  usuario: String,
  quantidade: Number
});

module.exports = model("Log", LogSchema);
