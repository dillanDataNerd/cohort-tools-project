const express = require("express")
const router = expressRouter()

const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User.model")

//POST /auth/signup - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
    const {email, password, name} = req.body

    try {
        const foundUser = await User.findOne({email})
        console.log(foundUser)
        if (foundUser !== null){
            res.json({
                errorMessage: "There is a user already registered with that email",
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 12)

        await User.create({
            email;
            password: hashPassword, 
            name
            
        })
        res.sendStatus(201)

    } catch (error) {
        console.log(error)
    }


})

//POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT

//GET /auth/verify - Verifies that the JWT sent by the client is valid