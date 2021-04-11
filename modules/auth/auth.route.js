const express = require("express")
const router = express.Router()
const { upload } = require("../../lib/fileUploadHelper")

const { verifyJwt } = require("../../lib/jwtHelper")

const AuthController = require("./auth.controller")

/**
 *
 *  All unauthenticated routes will be handled here
 *
 */

router.post("/login", AuthController.login)
router.post("/register", upload.single("image"), AuthController.register)

router.all("*", verifyJwt) // Auth Middleware


/**
 *
 *  All authenticated routes will be handled here
 *
 */


module.exports = router