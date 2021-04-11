const express = require("express")
const router = express.Router()
const { authenticate } = require("../../middlewares/authenticate")
const PostController = require("./post.controller")
/**
 *
 *  All unauthenticated routes will be handled here
 *
 */
router.get("/", PostController.getAllGroupedByUser)

router.all("*", authenticate) // Auth Middleware

/**
 *
 *  All authenticated routes will be handled here
 *
 */
router.post("/", PostController.create)

module.exports = router