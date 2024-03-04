require('dotenv').config()
const express= require('express')
const app= express()




const startServer = async()=>{

    app.listen(process.env.PORT, (err)=>{

        if(err) throw new Error(err)

        console.log('*'.repeat(100))
        console.log(`Server listening on port ${process.env.PORT}`)
        console.log('*'.repeat(100))

    })


}

startServer()
