const User= require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt= require("jsonwebtoken")

async function getAllUsers(req, res) {
    try {
      if (!Object.values(req.query).length) {
        const user = await User.findAll()
        
        if (user) {
          return res.status(200).json(timetables)
        } else {
          return res.status(404).send('No timetables found')
        }
      } else {
        const user = await User.findAll({
          where: {
            [Op.and]: [
              req.query
            ]
          }
        })
        if (user.length !== 0) {
          return res.status(200).json(user)
        } else {
          return res.status(404).send('No timetable found')
        }
      }
    } catch (error) {
      return res.status(500).send(error.message)
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


const updateProfile = async (req,res)=>{
    try{
    const user= res.locals.user
    if(req.body.hasOwnProperty("password")){

      const genSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
      req.body.password = await  bcrypt.hash(req.body.password, genSalt)
      
    } 
    let token =""
    if(req.body.email != res.locals.user.dataValues.email){


      token = jwt.sign({ email:req.body.email, role: req.body.role  }, process.env.JWT_SECRET )

    }

     await user.update(req.body )
    
    res.status(200).json(token)
    }
    catch(error){

      res.status(500).send(error.message)

    }

}




module.exports= {getAllUsers, getUser, deleteUser, updateUser, updateProfile}