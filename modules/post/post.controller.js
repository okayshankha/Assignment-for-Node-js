const { ObjectId } = require("mongodb")
const createError = require("http-errors")

const PostCreateDTO = require("./dtos/create-post-dto")
const PostRepository = require("./post.repository")

module.exports = {
    async getAllGroupedByUser(req, res) {
        try {
            const postDataGroupedByUser = await PostRepository.findAllGroupedByUser()

            const apiResponse = {
                statusCode: 200,
                message: "posts fetched",
                postDataGroupedByUser
            }
            return res.status(apiResponse.statusCode).send(apiResponse)

        } catch (error) {
            console.log(error);
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    },

    async create(req, res) {
        try {
            if (!req.user) throw Error("User not found")

            const { body } = req
            const validationResult = PostCreateDTO.validate(body)

            if (validationResult.error) {
                if (req.file) await del(req.file.path)
                const { error } = validationResult
                const apiError = createError(422, { error })
                return res.status(apiError.statusCode).send(apiError)
            }

            const postDataToSave = {
                ...body,
                _user: ObjectId(req.user._id)
            }

            const post = await PostRepository.save(postDataToSave)
            if (!post) {
                const apiError = createError(500)
                return res.status(apiError.statusCode).send(apiError)
            }

            const apiResponse = {
                statusCode: 201,
                message: "post created",
                post
            }
            return res.status(apiResponse.statusCode).send(apiResponse)

        } catch (error) {
            console.log(error);
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    }
}