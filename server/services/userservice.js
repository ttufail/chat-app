const { sign, verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require("bcryptjs");
const { userModel } = require('../database/model/usermodel');


const newUser = async (userEmail, userPassword) => {
    console.log("🚀 ~ newUser ~ userEmail:", userEmail)
    const existingUser = await userModel.findOne({ useremail: userEmail });
    if (existingUser) {
        return { success: false, message: "User already exists" }
    }
    try {
        const salt = await genSalt(10)
        const hashedPassword = await hash(userPassword, salt)
        const token = await sign({ useremail: userEmail }, "LoginToken", {
            expiresIn: "24h",
        });
        const userData = { useremail: userEmail, password: hashedPassword, token }
        const newUser = new userModel(userData)
        const newUserData = await newUser.save(userData)
        return { sucess: true, message: 'User created ', data: newUserData }
    } catch (error) {
        console.log("🚀 ~ newUser ~ error:", error)
        return { sucess: false, message: 'Error Inserting User', error }
    }
}
const checkForTokenValidation = async (userToken) => {
    const isValidToken = await verify(userToken, 'LoginToken')
    const currentTimestamp = Date.now() / 1000;
    if (isValidToken?.exp > currentTimestamp) {
        return {
            success: true,
            message: "Valid Token.",
        };
    } else {
        return {
            success: false,
            message: "Token is expired. Please log in again.",
        };
    }
}
const loginUser = async (userEmail, userPassword) => {
    try {
        const checkForUser = await userModel.findOne({ useremail: userEmail })
        if (!checkForUser) {
            return { success: false, message: "User does not exists" }
        }
        const isValidPassword = await compare(userPassword, checkForUser.password)
        if (!isValidPassword) {
            return { success: false, message: "invalid password" }
        }
        // const isValidToken = await checkForTokenValidation(checkForUser.token)
        // console.log("🚀 ~ loginUser ~ isValidToken:", isValidToken)
        // if (!isValidToken.success) {
        //     const newToken = await sign({ useremail: userEmail }, "LoginToken", {
        //         expiresIn: "24h",
        //     });
        //     const updatedUser = await userModel.findOneAndUpdate(
        //         { useremail: userEmail },
        //         { token: newToken },
        //         { new: true, select: "-password" }
        //     );
        //     const { token, _id } = updatedUser
        //     return { success: true, token, _id, user, userEmail }
        // }
        const { token, _id } = checkForUser
        console.log("🚀 ~ loginUser ~ _id:", _id)
        return { success: true, token, userEmail, _id }
    } catch (error) {
        return { success: false, error }
    }
}

module.exports = { newUser, loginUser }