const User= require('../models/user.model.js')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signUp = async (req, res)=>{

    try {
        const body = req.body.userInfo
        const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
        body.password= await  bcrypt.hash(body.password, genSalt)
        const user = await User.create(body)
        const token = jwt.sign({ email:body.email, role: body.role  }, process.env.JWT_SECRET )
        if(body.role==="teacher"){

            const teacher = await user.createTeacher_info(req.body.teacherInfo)
            res.locals.teacher=user
        }

        res.locals.user=user

        res.status(200).json(token)


    } catch (error) {
        res.status(500).send(error.message)
    }
}


const login = async (req, res)=>{
    try {
        const user= await User.findOne({where : {email: req.body.email}})
        if(!user) return res.status(400).send("Invalid email")

        bcrypt.compare(req.body.password, user.password, async (err, result) => {
            
            if(err) return res.status(500).send("Error, invalid password")

            if(result) {
                
                const token = jwt.sign({ email: req.body.email, role: user.dataValues.role   }, process.env.JWT_SECRET)
                return res.status(200).json(token)
            }
            res.status(400).send("Invalid password")

        });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports= {login,signUp}