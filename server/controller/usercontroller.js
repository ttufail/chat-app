const { newUser, loginUser } = require("../services/userservice")

const createNewUser = async (req, res) => {
    try {

        const { userEmail, userPassword } = req.body
        console.log("🚀 ~ createNewUser ~ req.body:", req.body)

        if (!userEmail || !userPassword) {
            return res.status(400).send("Invalid Credentials")
        }

        const userResponse = await newUser(userEmail, userPassword)

        if (userResponse.sucess) {
            return res.status(201).json(userResponse.data)
        }
        return res.status(400).json(userResponse.message)
    } catch (error) {
        console.log("🚀 ~ createNewUser ~ error:", error)
        return res.status(500).json(userResponse.message)
    }
}
const userLogin = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body
        if (!userEmail || !userPassword) {
           return res.status(400).send()
        }
        const loginUserResponse = await loginUser(userEmail, userPassword)
        if (loginUserResponse.success) {
            const { token } = loginUserResponse
            return res.status(200).json({ token, userEmail,
                userId:loginUserResponse._id })
            }
            console.log("🚀 ~ userLogin ~ loginUserResponse:", loginUserResponse)
        return res.status(400).json({ error: loginUserResponse?.error, message: loginUserResponse?.message })
    } catch (error) {
        console.log("🚀 ~ userLogin ~ error:", error)
        
    }
}
module.exports = { createNewUser, userLogin }