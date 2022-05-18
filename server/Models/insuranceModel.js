const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema(
  {},
  { collection: "Insurance", strict: false }
);
module.exports = mongoose.model("INSURANCE_SCHEMA", insuranceSchema);
