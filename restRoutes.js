const express = require("express")
const router = express.Router()

const AuthRouter = require("./modules/auth/auth.route")
const UserRouter = require("./modules/user/user.route")
const PostRouter = require("./modules/post/post.route")

router.use("/auth", AuthRouter)
router.use("/user", UserRouter)
router.use("/post", PostRouter)

module.exports = router