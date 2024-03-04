
const sequelize = require('./index.js')



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
        


    } catch (error) {
        
    }


}



module.exports= {dbCheck, dbSync}