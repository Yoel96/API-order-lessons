const jwt = require('jsonwebtoken')

const User = require('../models/user.model')


const checkAuth = (req,res,next)=>{
    try {
        if( !req.headers.authorization) return res.status(500).send('Unauthorized') //headers de postman
         
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, payload) => {
            if (err) return res.status(500).send('Unauthorized')
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: payload.role
                }})
             if (!user) return res.status(500).send('Unauthorized')
            res.locals.user = user
            next()  
        })
    } catch (error) {
        console.log(errcheckAuthor)
        res.status(500).send('Unauthorized')
    }


}


const checkTeacher = (req, res, next) => {
    try {
        if( !req.headers.authorization) return res.status(500).send('Unauthorized') //headers de postman
         
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, payload) => {
            if (err) return res.status(500).send('Unauthorized')
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: payload.role
                }})
             if (!user) return res.status(500).send('Unauthorized')
            res.locals.user = user
            next()  
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Unauthorized')
    }
}

const checkStudent = (req, res, next) => {
    try {
        if( !req.headers.authorization) return res.status(500).send('Unauthorized') //headers de postman

        jwt.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, payload) => {
            if (err) return res.status(500).send('Unauthorized')
            const user = await User.findOne({
                where: {
                    email: payload.email,
                    role: payload.role
                }})
            if (!user) return res.status(500).send('Unauthorized')
            res.locals.checkAuthuser = user
            next()  
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Unauthorized')
    }
}
 

const checkRole = (req, res, next, roles) => {
 
    
    if(roles.includes(res.locals.user.dataValues.role)){
         next()

    }else{
    return res.status(500).send("That user is not authorized")
    }
}



module.exports = { checkTeacher,checkStudent, checkAuth ,checkRole}