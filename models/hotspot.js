const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const hotspotSchema = new Schema({
  name: String,
  address: String,
  type: {
    mainType: String,
    subType: Array,
  }

}, {
  timestamps: true
});

const Hotspot = mongoose.model("Hotspot", hotspotSchema);

module.exports = Hotspot;