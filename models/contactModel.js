const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
    unique: true,
  },
  lastName: String,
  email: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
