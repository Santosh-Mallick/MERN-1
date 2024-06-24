const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


const router = express.Router();

router.route("/users").get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route("/contacts").get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route("/users/:id").get(authMiddleware,adminMiddleware,adminController.getUserById); // to get current logged in user details
router.route("/users/update/:id").patch(authMiddleware,adminMiddleware,adminController.updateUserById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUserById);
router.route("/contacts/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteContactById);


module.exports = router;