const express = require("express")
const router = express.Router()
const { authenticate } = require("../../middlewares/authenticate")
const UserController = require("./user.controller")

/**
 *
 *  All authenticated routes will be handled here
 *
 */

router.get("/me", authenticate, UserController.me)


/**
 *
 *  All unauthenticated routes will be handled here
 *
 */
router.get("/", UserController.getAll)
router.get("/:id", UserController.get)

module.exports = router