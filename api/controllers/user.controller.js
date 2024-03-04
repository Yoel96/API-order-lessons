const User= require('../models/user.model.js')
const bcrypt = require('bcrypt')

const getAllUsers= async (req,res)=>{

    try {
        const users = await User.findAll()
        if(users) res.status(200).json(users)
    } catch (error) {
        res.status(500).send("Error getting users")
    }

}


const getUser= async (req,res)=>{

    try {
        const user = await User.findByPk(req.params.userId)
        if(user) res.status(200).json(user)
    } catch (error) {
        res.status(500).send("Error getting user")
    }

}

const deleteUser= async (req,res)=>{

    try {
        console.log(req.params.userId)
        const user = await User.destroy({where:{id:req.params.userId }})
        if(!user) return res.status(400).send("User not found")
        res.status(200).send("User deleted")
    } catch (error) {
        res.status(500).send("Error deleting user")
    }

}

const updateUser= async (req,res)=>{

    try {
        req
        if(req.body.hasOwnProperty("password")){

            const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
            req.body.password = await  bcrypt.hash(req.body.password, genSalt)

        }

         const user= await User.update(req.body, {
            returning: true,
            where: {
              id: req.params.userId
            }
          })
          if(!user) return res.status(400).send("User not found")
          res.status(200).send("User updated")

    } catch (error) {
        res.status(500).send("Error updating user")

    }

}


module.exports= {getAllUsers, getUser, deleteUser, updateUser}