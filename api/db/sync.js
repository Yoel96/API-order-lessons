
const sequelize = require('./index.js')
const User = require('../models/user.model.js')
const Teacher = require('../models/teacher.model.js')


const dbCheck = async()=>{
    try{

        await sequelize.authenticate()
        console.log("Connected to Order Lessons database")
        
    }
    catch(err){
        throw new Error(err)
    }

}


const dbSync = async ()=>{

    try {
        
        await User.sync()
        await Teacher.sync()
    } catch (error) {
        
    }


}



module.exports= {dbCheck, dbSync}