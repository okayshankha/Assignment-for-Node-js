const express = require("express")
const router = express.Router()
const { authenticate } = require("../../middlewares/authenticate")
const UserController = require("./user.controller")
/**
 *
 *  All unauthenticated routes will be handled here
 *
 */
router.get("/", UserController.getAll)
router.get("/:id", UserController.get)

router.all("*", authenticate) // Auth Middleware

/**
 *
 *  All authenticated routes will be handled here
 *
 */

router.get("/me", UserController.me)


module.exports = router