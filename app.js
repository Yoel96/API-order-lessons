require('dotenv').config()
const express= require('express')
const app= express()
const {dbSync, dbCheck} = require('./api/db/sync')




const startServer = async()=>{

    app.listen(process.env.PORT, async (err)=>{

        if(err) throw new Error(err)
        await dbCheck()
        await dbSync()
        console.log('*'.repeat(100))
        console.log(`Server listening on port ${process.env.PORT}`)
        console.log('*'.repeat(100))

    })


}

startServer()
