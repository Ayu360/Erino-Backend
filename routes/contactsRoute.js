const express = require("express");
const contactsController = require("../controllers/contactsController");

const router = express.Router();
// router.param("id", contactsController.checkID);

router
  .route("/")
  .get(contactsController.getContacts)
  .post(contactsController.postContacts);

router
  .route("/:id")
  .put(contactsController.putContact)
  .delete(contactsController.deleteContact);

module.exports = router;
