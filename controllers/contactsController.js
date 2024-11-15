const Contact = require("../models/contactModel");
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: "Success",
      results: contacts.length,
      data: {
        contacts,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

exports.postContacts = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.firstName ||
      typeof body.firstName !== "string" ||
      body.firstName.trim() === ""
    ) {
      return res.status(400).json({
        status: "Fail",
        message: "First name is required and must be a non-empty string.",
      });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!body.phone || !phoneRegex.test(body.phone)) {
      return res.status(400).json({
        status: "Fail",
        message:
          "Contact is required and must be a valid 10-digit phone number.",
      });
    }

    const newContact = await Contact.create(body);
    res.status(201).json({
      status: "Success",
      data: {
        newContact,
      },
    });
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: e,
    });
  }
};

exports.putContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "Success",
      body: updatedContact,
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e,
    });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        status: "Failed",
        message: "No contact found with that ID",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Contact successfully deleted",
      data: deletedContact,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while deleting the contact",
      error: e.message,
    });
  }
};
