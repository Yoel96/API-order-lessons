require('dotenv').config()
const express= require('express')
const app= express()
const {dbSync, dbCheck} = require('./api/db/sync')
const DBRelationships = require('./api/db/relationships')





const startServer = async()=>{

    app.use(express.json())
    app.use('/api', require('./api/routes/index.js'))



    app.listen(process.env.PORT, async (err)=>{

        if(err) throw new Error(err)
        await dbCheck()
        await DBRelationships()
        //await dbSync()
        console.log('*'.repeat(100))
        console.log(`Server listening on port ${process.env.PORT}`)
        console.log('*'.repeat(100))

    })


}

startServer()
